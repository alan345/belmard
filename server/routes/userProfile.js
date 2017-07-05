var express = require('express'),
  router = express.Router(),
  passwordHash = require('password-hash'),
  jwt = require('jsonwebtoken'),
  config = require('../config/config'),
  fs = require('fs'),
  multer = require('multer'),
  mime = require('mime'),
  path = require('path'),
  crypto = require("crypto"),
  gm = require('gm').subClass({imageMagick: true});

var User = require('../models/user.model');

var stripe = require("stripe")("sk_test_cg4vcpE5gV1ApywsErwoWL7u");


router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Authentication failed',
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(403).json({
        title: 'Authentication failed',
        error: {message: 'Authentication failed'}
      });
    }
    if (decoded) {
      User.findById(decoded.user._id, function (err, doc) {
        if (err) {
          return res.status(500).json({
            title: 'Fetching user failed',
            message: 'Fetching user failed',
            err: err
          });
        }
        if (!doc) {
          return res.status(404).json({
            title: 'The user was not found',
            error: {message: 'The user was not found'}
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      });
    }
  });
});






router.get('/getStripeCard', function (req, res, next) {
  // console.log(req.user.paiement.stripe.cardId)
    if(!req.user.paiement.stripe.cardId) {
      return res.status(404).json({
        title: 'No data',
        error: 'noData'
      });
    }
    console.log('alan')
    console.log(req.user.paiement.stripe.cusId, req.user.paiement.stripe.cardId)
    stripe.customers.retrieveCard(req.user.paiement.stripe.cusId, req.user.paiement.stripe.cardId,
      function(err, card) {
        if(err) {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        } else {
          return res.status(200).json({
            customer: card
          })
        }
      }
    );
})

router.get('/getStripeCust', function (req, res, next) {
  console.log(req.user.paiement.stripe)
    if(!req.user.paiement.stripe.cusId) {
      return res.status(404).json({
        title: 'No data',
        error: 'noData'
      });
    }
    stripe.customers.retrieve(req.user.paiement.stripe.cusId,
      function(err, customer) {
        if(err) {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        } else {
          return res.status(200).json({
            customer: customer
          })
        }
      }
    );
})




function updateStripeCustomerIdToDb(req, customer){
  let paiement = req.user.paiement
  paiement.stripe.cusId = customer.id
  return new Promise(function(resolve, reject) {
    User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
      if (err) { resolve(item) } else { reject(err) }
    });
  })
}

function updateStripeCardIdToDb(req, card){
  let paiement = req.user.paiement
  paiement.stripe.cardId = card.id

  return new Promise(function(resolve, reject) {
    User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
      if (err) { resolve(item) } else { reject(err) }
    });
  })
}


function createCustomerInStripe() {
  return new Promise(function(resolve, reject) {
    stripe.customers.create({
      description: 'Customer for alan345alan@gmail.com',
      email: 'alan345alan@gmail.com'
    }, function(err, customer) {
      if(customer){
        console.log(customer)
        resolve(customer)
      } else {
        console.log(err)
        reject(error)
      }
    })
  })
}



function createSubscription(customer){
    return new Promise(function(resolve, reject) {
      stripe.subscriptions.create({
        customer: customer.id,
        plan: "gold"
      }, function(err, subscription) {
        if(subscription) {
          console.log(subscription)
          resolve(subscription)
        } else {
          console.log(err)
          reject(error)
        }
      });
    })
}

function createCardInStripe(cusId){
  return new Promise(function(resolve, reject) {
      stripe.customers.createSource(
        cusId,
        {
          source: {
            "object": "card",
            "address_city": "EPinal",
            "address_country": "France",
            "address_line1": "70 chemin du petit chaperon rouge",
            "address_line2": "",
            "address_state": "assignedTos",
            "address_zip": "10100",
            "exp_month": 8,
            "exp_year": 2018,
            "number": "4242424242424242",
            "last4": "4242",
            "metadata": {},
            "name": null,
          }
         },
        function(err, card) {
          if(card) {
            console.log(card)
            resolve(card)
          } else {
            console.log(err)
            reject(err)
          }
        }
      );
  })
}
router.post('/saveCustInStripe/', function (req, res, next) {
  if(!req.user.paiement.stripe.cusId) {
    createCustomerInStripe().then(function(customer){
      updateStripeCustomerIdToDb(req, customer).then(function(item){
        if(item) {
          return res.status(200).json({
            customer: customer
          })
        } else {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        }
      })
    })
  }
});
router.post('/saveCardInStripe/', function (req, res, next) {
  if(req.user.paiement.stripe.cusId && !req.user.paiement.stripe.cardId) {
    createCardInStripe(req.user.paiement.stripe.cusId).then(function(card){
      updateStripeCardIdToDb(req, card).then(function(item){
        if(item) {
          return res.status(200).json({
            customer: customer
          })
        } else {
          return res.status(404).json({
            title: 'No data in stripe',
            error: 'noData'
          });
        }
      })
    })
  }
});

router.post('/paiement/', function (req, res, next) {
  if(!req.user.paiement.stripe.cusId) {

  }
  // createCustomerInStripe().then(function(customer){
  //   updateStripeCustomerIdToDb()
  //   createSource(customer).then(function(card){
  //     createSubscription(customer).then(function(subscription){
  //     })
  //   })
  // })
});



// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 25
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  var limit = (itemsPerPage * pageNumber) + itemsPerPage

//  let parentUserToSearch = ''
  let roleToSearch = []
  let findQuery = {}

  if(req.query.parentUser)
    findQuery['profile.parentUser'] = mongoose.Types.ObjectId(req.query.parentUser)


  if(req.query.search)
    findQuery['profile.name'] = new RegExp(req.query.search, 'i')


  if(req.query.role) {
    roleToSearch = [req.query.role]
    findQuery['role'] = {$in: roleToSearch}
  }



  User
  .find(findQuery)
  .limit(itemsPerPage)
  .skip(skip)
  .sort(req.query.orderBy)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      User
      .find(findQuery)
      .count().exec(function (err, count) {
      res.status(200).json({
          paginationData : {
            totalItems: count,
            currentPage : currentPage,
            itemsPerPage : itemsPerPage
          },
          data: item
        })
      })
    }
  })


})


//
// router.get('/getUsersByEmail', function (req, res, next) {
//   var itemsPerPage = 5
//   var currentPage = 1
//   var pageNumber = currentPage - 1
//   var skip = (itemsPerPage * pageNumber)
//   var limit = (itemsPerPage * pageNumber) + itemsPerPage
//   //lastVisit
//   //console.log(req.query.email)
//
//   User
//   .find({
//     'email' : new RegExp(req.query.email, 'i')
//   })
//   .limit(itemsPerPage)
//   .skip(skip)
//   .sort(req.query.orderBy)
//   .exec(function (err, item) {
//     if (err) {
//       return res.status(404).json({
//         message: 'No results',
//         err: err
//       })
//     } else {
//       User
//       .find({
//         'profile.name' : new RegExp(req.query.search, 'i')
//       })
//       .count().exec(function (err, count) {
//       res.status(200).json({
//           paginationData : {
//             totalItems: count,
//             currentPage : currentPage,
//             itemsPerPage : itemsPerPage
//           },
//           data: item
//         })
//       })
//     }
//   })
// })


function getUser(req, res, next, id) {
    User
    .findById(id)
    // .populate('products.product')
    .populate({path: 'forms', model: 'Form'})
    .populate({path: 'salesMan', model: 'User'})
    // .populate('profile._profilePicture')
    // .populate('profile.parentUser')


    .populate({
        path: 'companies',
        model: 'Companie',
        populate: {
          path: 'forms',
          model: 'Form'
        }
      })
    .exec(function (err, user) {
      if (err) {
        return res.status(403).json({
          title: 'There was a problem',
          error: err
        });
      }

      if (!user) {
        return res.status(404).json({
          title: 'No form found',
          error: {message: 'Item not found!'}
        });
      }

      return res.status(200).json({
        user: user
      })
    })
}

router.get('/:id', function (req, res, next) {
  let id = req.params.id
  getUser(req, res, next, id)
});

router.get('', function (req, res, next) {
  let id = req.user._id
  getUser(req, res, next, id)
});


// setting up multer for profile pic upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dest = 'server/uploads/profiles/' + req.user._id;  // i know, i should use dirname blah blah :)
    var stat = null;
    try {
      stat = fs.statSync(dest);
      var profileDir = 'server/uploads/profiles/' + req.user._id;
      rmDir(profileDir, false);
    }
    catch (err) {
      fs.mkdirSync(dest);
    }
    if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    }
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    //if you want even more random characters prefixing the filename then change the value '2' below as you wish, right now, 4 charaters are being prefixed
    crypto.pseudoRandomBytes(2, function (err, raw) {
      cb(null, raw.toString('hex') + '.' + file.originalname.toLowerCase());
    });
  }
});

// telling multer what storage we want and filefiltering to check if file is an image, the 'parts' property declares how many fields we are expecting from front end
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5MB filesize limit
    parts: 3
  },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpe?g|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});

router.post('/image', upload.single('profilePic'), function (req, res, err) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(500).json({
      message: 'There was an error',
      error: err
    });
  }

  // finding the user who initialized the upload from front end
  User.findById(req.user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        err: err
      });
    }
    // setting our new form to be saved in database, we fetch the data from the front end,
    // req.file.path is coming from multer, we need that value to store the path to database
    // at the end we assinging the owner of the form by passing the user _id to the form
    // in the backend we are referencing each form to the user who uploaded it
    // so later on we can display the data in the front end
    // resize middleware, just change 400 to whatever you like, the null parameter maintains aspect ratio, if you want exact dimensions replace null with a height number as you wish
    // console.log(req.file);
    gm(req.file.path)
      .resize(400, null)
      .noProfile()
      .write(req.file.path, function (err) {
        if (err) {
          console.log(err);
          fs.unlink(req.file.path);
          // this will result a 404 when frontend tries to access the image, I ll provide a fix soon
        }
      });
    user.update({$set: {profilePic: req.file.filename}}, function (err, result) {
      if (err) {
        return res.status(404).json({
          message: 'There was an error, please try again',
          err: err
        });
      }
      res.status(201).json({
        message: '',
        obj: result
      });
    });
  });
});

// change user password from front end form inside user's profile
router.post('/password', function (req, res, next) {
  User.findOne({_id: req.user._id}, function (err, user) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!passwordHash.verify(req.body.currentPassword, user.password)) {
      return res.status(403).json({
        title: 'You cannot change the password',
        error: {message: 'Incorrect current password, please try again'}
      })
    } else {
      var newPassword = passwordHash.generate(req.body.newPassword);
      user.update({$set: {password: newPassword}}, function (err, result) {
        if (err) {
          return res.status(404).json({
            message: 'There was an error, please try again',
            err: err
          });
        }
        res.status(201).json({
          message: 'Password changed successfully',
          obj: result
        });
      })
    }
  });
});





router.put('/addCompanieToMyself', function (req, res, next) {
  console.log(req.user._id)
  User.update({ _id: req.user._id }, { $set: { companies: [req.body._id] }}, function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
      res.status(201).json({
        message: '',
        obj: item
      });
    }
  });
});


//update profile @alan
router.put('/:id', function (req, res, next) {
  User.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {

      for (var prop in req.body) {
        if(prop !== '__v' && prop !== 'updatedAt' && prop !== 'createdAt')
          item[prop] = req.body[prop]
      }

      item.save(function (err, result) {
        if (err) {
          return res.status(404).json({
            message: 'There was an error, please try again',
            err: err
          });
        }
        res.status(201).json({
          message: '',
          obj: result
        });
      });

    }
  })
});

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for( var i=0; i < 20; i++ )
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// }
//
// // user Create without email. See register
// router.post('/', function (req, res, next) {
// //  console.log(req.body)
//   let uniqueString = makeid()
//   let email = ''
//   let role = ''
//   if (req.body.email) {
//     email = req.body.email
//   } else {
//     email = 'random_' + uniqueString + '@random.com'
//   }
//
//   if (req.body.role) {
//     role = req.body.role
//   } else {
//     role = ['client']
//   }
//
//   if (!req.body.profile.parentUser.length) {
//     req.body.profile.parentUser = [req.user._id]
//   }
//
//
//   var user = new User({
//     email: email,
//     password: passwordHash.generate(uniqueString),
//     profile : req.body.profile,
//     role : role
//   });
// //  console.log(user)
//   user.save(function (err, result) {
//     if (err) {
//       console.log(err)
//       return res.status(403).json({
//         title: 'There was an issue',
//         error: {message: 'The email you entered already exists'}
//       });
//     }
//     res.status(200).json({
//       message: 'Registration Successfull',
//       obj: result
//     })
//   })
// });


var rmDir = function (dirPath, removeSelf) {
  if (removeSelf === undefined)
    removeSelf = true;
  try {
    var files = fs.readdirSync(dirPath);
  }
  catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  if (removeSelf)
    fs.rmdirSync(dirPath);
};






router.delete('/:id', function (req, res, next) {
  User.findById((req.params.id), function (err, item) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!item) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }

    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      })
    })
  })
})





module.exports = router;
