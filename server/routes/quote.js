var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Quote    = require('../models/quote.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');
    mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});




router.get('/:id', function (req, res, next) {
  Quote.findById((req.params.id), function (err, obj) {
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

    Quote
    .findOne(findQuery)
    .populate({path: 'projects', model: 'Project'})
    .populate({path: 'clients', model: 'User'})

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






router.get('/graph/:year', function (req, res, next) {
  let searchQuery = {}
  let dateBegin = req.params.year*1 + '-01-01'
  let dateEnd = req.params.year*1 +1 + '-01-01'


  if(req.query.search)
    searchQuery['details.name'] = new RegExp(req.query.search, 'i')

  if(req.query.idQuote)
    searchQuery['quotes'] = mongoose.Types.ObjectId(req.query.idQuote)

  Quote
  .aggregate(
    {
      $match: {
        createdAt :
         {
           '$gte': new Date(dateBegin),
           '$lt': new  Date(dateEnd)
         }
       }
    },
    {
     $group : {
         _id : {
          year: { $year : "$createdAt" },
          month: { $month : "$createdAt" },
            //  day: { $dayOfMonth : "$datePaiement" }
        },
         amountTotal : { $sum : "$priceQuote.priceQuoteWithoutTaxes" }
      }
    }
  )
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
     })
   }
 })

})




//update
router.put('/:id', function (req, res, next) {
  Quote.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    }



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
  if(!req.user.companies.length) {
    return res.status(404).json({
      message: 'You must belong to a companie',
      err: ''
    })
  }
  var quote = new Quote(req.body);
  quote.ownerCompanies = req.user.companies
  quote.save(function (err, result) {
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


  if(req.query.userId)
    search['clients'] = mongoose.Types.ObjectId(req.query.userId)

  if(req.query.projectId)
    search['projects'] = mongoose.Types.ObjectId(req.query.projectId)




  Quote
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
      Quote
      .find(search)
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





router.delete('/:id', function (req, res, next) {
  Quote.findById((req.params.id), function (err, item) {

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
