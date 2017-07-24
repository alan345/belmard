var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    UserCalendar    = require('../models/userCalendar.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken')



    // crypto      = require("crypto"),
    // nodemailer  = require('nodemailer'),
    // async       = require('async'),
    // sgTransport = require('nodemailer-sendgrid-transport'),
    // config      = require('../config/config');
    //

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err)
})

// Checking if user is authenticated or not, security middleware
router.use('/', function (req, res, next) {
  var token = req.headers['authorization']
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
        error: {message: 'Authentication failed, malformed jwt'}
      })
    }
    if (decoded) {
      User
      .findById(decoded.user._id)
      .populate({ path: 'rights', model: 'Right'})
      .exec(function (err, doc) {
        if (err) {
          return res.status(500).json({
            message: 'Fetching user failed',
            err: err
          })
        }
        if (!doc) {
          return res.status(404).json({
            title: 'User not found',
            error: {message: 'The user was not found'}
          })
        }
        if(!shared.isCurentUserHasAccess(doc.rights, 'userCalendar', 'read')) {
          return res.status(404).json({
            title: 'No rights',
            error: {message: 'No rights'}
          })
        }
        if (doc) {
          req.user = doc
          next()
        }
      })
    }
  })
})



//update
router.put('/:id', function (req, res, next) {
  UserCalendar.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: '',
        err: err
      })
    } else {
      //console.log(req.body)
        // item.details = req.body.details
        // item.forms = req.body.forms
        // item.status = req.body.status
        // item.embed = req.body.embed
        // item.categories = req.body.categories
        // item.clients = req.body.clients
        // item.quotes = req.body.quotes
        // item.categorie = req.body.categorie
        item.title = req.body.title,
        item.url = req.body.url,
        item.start = req.body.start,
        item.end = req.body.end,
        item.details = req.body.details,
        item.user = req.body.user,
        item.color = req.body.color,
        item.clients = req.body.clients,
        item.users = req.body.users,
        item.projects = req.body.projects,




        item.save(function (err, result) {
          if (err) {
            return res.status(404).json({
              message: 'There was an error, please try again',
              err: err
            })
          }
          res.status(201).json({
            message: 'Updated successfully',
            obj: result
          })
        })

    }
  })
})

router.post('/', function (req, res, next) {
  if(!req.user.ownerCompanies.length) {
    return res.status(404).json({
      message: 'You must belong to a companie',
      err: ''
    })
  }
  //console.log(req.body)
  //var UserCalendar = new UserCalendar(req.body)
  var userCalendar = new UserCalendar(req.body)
  userCalendar.ownerCompanies = req.user.ownerCompanies
  // console.log(userCalendar)

  userCalendar.save(function (err, result) {
    if (err) {
      console.log(err)
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'Error'}
      })
    }
    res.status(200).json({
      message: 'Registration Successfull',
      obj: result
    })
  })
})




// get all forms from database
router.get('/page/:page', function (req, res, next) {
  var itemsPerPage = 6
  var currentPage = Number(req.params.page)
  var pageNumber = currentPage - 1
  var skip = (itemsPerPage * pageNumber)


  let searchQuery = {
   start:{"$gt": req.query.startDate},
   end:{"$lt": req.query.endDate},
  }
  console.log('saaaaaa')
  console.log(req.query.userSearch)
  if(req.query.userSearch)
    searchQuery['users'] = mongoose.Types.ObjectId(req.query.userSearch)

  if(req.query.projectSearch)
    searchQuery['projects'] = mongoose.Types.ObjectId(JSON.parse(req.query.projectSearch)._id)

  // if(req.query.clientSearch)
  //   searchQuery['clients'] = mongoose.Types.ObjectId(JSON.parse(req.query.clientSearch)._id)
  //

  if(req.query.search)
    searchQuery['name'] = new RegExp(req.query.search, 'i')

  UserCalendar
  .find(searchQuery)
  .sort('-createdAt')
  .populate({path: 'clients', model: 'User'})
  .populate({path: 'users', model: 'User'})
  .populate({path: 'projects', model: 'Project'})
  .limit(itemsPerPage)
  .skip(skip)
  .exec(function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'No results',
        err: err
      })
    } else {
      UserCalendar
      .find(searchQuery)
      .count()
      .exec(function (err, count) {

        if(req.query.typeUser) {
          var itemFiltered = []
          item.forEach(event => {
            event.clients.forEach(client=> {
              if(client.type.length) {
                if(client.type[0] === req.query.typeUser) {
                  itemFiltered.push(event)
                }
              }
            })
          })
          item = itemFiltered
          count = item.length
        }


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




// getting user forms to display them on front end
router.get('/:id', function (req, res, next) {
  UserCalendar.findById((req.params.id), function (err, obj) {
    if (err) {
      return res.status(500).json({
        message: 'An error occured',
        err: err
      })
    }
    if (!obj) {
      return res.status(404).json({
        title: 'No obj found',
        error: {message: 'Obj not found!'}
      })
    }


    UserCalendar
    .findById({_id: req.params.id})
    .populate({path: 'clients', model: 'User'})
    .populate({path: 'quotes', model: 'Quote'})
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
})

//
//
// // getting user forms to display them on front end
// router.get('/countNewItemForUser/:id', function (req, res, next) {
//   User
//   .findOne({_id: req.params.id})
//   .exec(function (err, user) {
//     if (err) {
//       return res.status(403).json({
//         title: 'There was a problem',
//         error: err
//       });
//     } else {
//       UserCalendar
//       .find({createdAt:{"$gt": user.trackinPage.lastVisitPageUserCalendar}})
//       .exec(function (err, item) {
//         if (err) {
//           return res.status(404).json({
//             message: '',
//             err: err
//           })
//         } else {
//           res.status(200).json({
//             message: 'Success',
//             item: item
//           })
//         }
//       })
//     }
//   })
// })


router.delete('/:id', function (req, res, next) {
  UserCalendar.findById((req.params.id), function (err, item) {
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

//
// // retrieving a single form
// router.get('/edit/:id', function (req, res, next) {
//   Form.findById((req.params.id), function (err, form) {
//     if (err) {
//       return res.status(500).json({
//         message: 'An error occured',
//         err: err
//       })
//     }
//     if (!form) {
//       return res.status(404).json({
//         title: 'No form found',
//         error: {message: 'Form not found!'}
//       })
//     }
//     // checking if the owner of the form is correct
//     if (form.owner != req.user._id.toString()) {
//       return res.status(401).json({
//         title: 'Not your form!',
//         error: {message: 'Users do not match, not your form'}
//       })
//     }
//     res.status(200).json({
//       obj: form
//     })
//   })
// })

module.exports = router
