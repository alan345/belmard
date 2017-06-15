var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Companie    = require('../models/companie.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');
    mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});


// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization'];
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: 'Authentication failed',
        error: err
      })
    }
    if (!decoded) {
      return res.status(404).json({
        title: 'Authentication Failed',
        error: {message: 'Authentication failed, malformed jwt. Please login or refresh Page'}
      });
    }
    if (decoded) {
      User.findById(decoded.user._id, function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          });
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if (doc) {
          req.user = doc;
          next();
        }
      })
    }
  })
});


//update
router.put('/:id', function (req, res, next) {
  Companie.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    }

    var foundDuplicate = false
    var latestItem = req.body._users[req.body._users.length-1]
    item._users.forEach(userId => {
      if(userId == latestItem._id)
        foundDuplicate = true
    })

    if(foundDuplicate) {
      return res.status(404).json({
        message: 'Duplicate',
        err: 'Duplicate users'
      })
    }

    // if( req.user.role[0] !== 'admin') {
    //   let belongToThisCompanie = false
    //   item._users.forEach(user => {
    //       //console.log(user,req.user._id.toString())
    //     if(user.toString() === req.user._id.toString()){
    //   //    console.log('aa')
    //       belongToThisCompanie = true
    //     }
    //
    //   })
    //   //console.log(belongToThisCompanie)
    //   if(!belongToThisCompanie) {
    //     return res.status(404).json({
    //       message: 'Not your companie',
    //       err: 'Not your companie'
    //     })
    //   }
    // }

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

  })
});

router.post('/', function (req, res, next) {
  var companie = new Companie(req.body);
  companie.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'The email you entered already exists'}
      });
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
});



// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 5
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)
  //var limit = (itemsPerPage * pageNumber) + itemsPerPage

  let nameQuery = {}
  let cityQuery = {}
  let search = {}
  let arrObj = []
  if(req.query.search) {
  //  nameQuery['name'] = new RegExp(req.query.search, 'i')
  //  cityQuery['address.city'] = new RegExp(req.query.search, 'i')
    arrObj.push({'name' : new RegExp(req.query.search, 'i')})
    arrObj.push({'address.city' : new RegExp(req.query.search, 'i')})
    arrObj.push({'address.address' : new RegExp(req.query.search, 'i')})
    search = {$or:arrObj}
    //findQuery['address.city'] = new RegExp(req.query.search, 'i')
  }


  if(req.query.typeCompanie)
    search['typeCompanie'] = req.query.typeCompanie

  if (req.user.role[0] === 'salesRep') {
    search['_users'] = mongoose.Types.ObjectId(req.user._id)
    search['typeCompanie'] = { $nin: 'HQ'}

  }
  if (req.user.role[0] === 'manager') {
    search['_users'] = mongoose.Types.ObjectId(req.user._id)
  }
  if (req.user.role[0] === 'stylist') {
    search['_users'] = mongoose.Types.ObjectId(req.user._id)
  }




  // if(req.query.parentUser)
  //   findQuery['profile.parentUser'] = mongoose.Types.ObjectId(req.query.parentUser)
  //

  //let arrObj = [{findQuery}]
//  console.log(arrObj)

  Companie
  .find(search)
  .populate(
    {
      path: '_users',
      model: 'User',
    })
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
      Companie
      .find()
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



router.get('/byuserid/:id', function (req, res, next) {
  Companie
  .find({
    '_users' : mongoose.Types.ObjectId(req.params.id)
  })
  .populate({
    path: 'forms',
    model: 'Form'
  })
  .populate(
    {
      path: '_users',
      model: 'User',
      populate: {
        path: 'profile._profilePicture',
        model: 'Form'
      }
    })
    .populate(
      {
        path: '_users',
        model: 'User',
        populate: {
          path: 'profile.parentUser',
          model: 'User'
        }
      })
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
      res.status(200).json({
        message: 'Success',
        item: item
      });
    }
  })
})




router.get('/:id', function (req, res, next) {

  // if(req.user.role[0] === 'client') {
  //   return res.status(404).json({
  //     title: 'No obj found',
  //     error: {message: 'Not found!'}
  //   })
  // }
  Companie.findById((req.params.id), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      })
    }


    let findQuery = {}

    findQuery['_id'] = req.params.id
    let findUsers ={
        path: '_users',
        model: 'User',
      }
    if (req.user.role[0] === 'admin' || req.user.role[0] === 'manager') {
      findUsers = {
          path: '_users',
          model: 'User',
          //options: { sort: { 'role': +1 } },
          populate: {
            path: 'profile.parentUser',
            model: 'User',
          }
        }
    }
    if(obj.typeCompanie === 'HQ') {
      findUsers = {
          path: '_users',
          model: 'User',
        //  options: { sort: { 'role': -1 } },
          populate: {
            path: 'profile.parentUser',
            model: 'User',
          }
        }
    }

    if(obj.typeCompanie !== 'HQ') {

      if (req.user.role[0] === 'stylist' || req.user.role[0] === 'salesRep') {

        //findQuery['_users'] = {$in: req.user._id}
        //findQuery['_users'] = req.user._id
        //let onlyMyUsers = JSON.parse(req.query.onlyMyUsers)
    //    console.log(req.query.onlyMyUsers)
        if(req.query.onlyMyUsers === 'true') {


          findUsers = {
              path: '_users',
              model: 'User',
              match: { 'profile.parentUser' : mongoose.Types.ObjectId(req.user._id.toString()) },
            //  options: { sort: { 'role': -1 } },
              populate: {
                path: 'profile.parentUser',
                model: 'User',
              }
            }
          } else {
            if(req.query.onlyMyUsers === 'false')
              findUsers = {
                  path: '_users',
                  model: 'User',
                //  options: { sort: { 'role': -1 } },
                //  match: { 'profile.parentUser' : mongoose.Types.ObjectId(req.user._id.toString()) },
                  populate: {
                    path: 'profile.parentUser',
                    model: 'User',
                  }
                }
          }
      }
    }
    Companie
    .findOne(findQuery)
    //.find()
    .populate({
      path: 'forms',
      model: 'Form'
    })
    .populate(
      {
        path: '_users',
        model: 'User',
        populate: {
          path: 'profile._profilePicture',
          model: 'Form'
        }
      })
      .populate(
        findUsers
      )
    //.populate('users._user.profile.profilePicture._id')
    .exec(function (err, item) {
      if (err) {
        return res.status(404).json({
          message: '',
          err: err
        })
      } if (!item) {
        return res.status(404).json({
          title: 'No obj found',
          error: {message: 'Obj not found!'}
        })
      } else {
        res.status(200).json({
          message: 'Success',
          item: item
        });
      }
    })
  })
})


router.delete('/:id', function (req, res, next) {
  Companie.findById((req.params.id), function (err, item) {

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
      });
    }


    // deleting the form from the database
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Item is deleted',
        obj: result
      });
    })
  });
});


// retrieving a single form
router.get('/edit/:id', function (req, res, next) {
  Form.findById((req.params.id), function (err, form) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!form) {
      return res.status(404).json({
        title: 'No form found',
        error: {message: 'Form not found!'}
      });
    }
    // checking if the owner of the form is correct
    if (form.owner != req.user._id.toString()) {
      return res.status(401).json({
        title: 'Not your form!',
        error: {message: 'Users do not match, not your form'}
      });
    }
    res.status(200).json({
      obj: form
    });
  });
});

module.exports = router;
