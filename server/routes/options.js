var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');
    Option    = require('../models/option.model'),

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});



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
      User.findById(decoded.user._id, function (err, doc) {
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
        if (doc) {
          req.user = doc
          next()
        }
      })
    }
  })
})





router.get('/', function (req, res, next) {
  Option
  .findOne({ user : mongoose.Types.ObjectId(req.user._id)})
  .exec(function (err, obj) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!obj) {
      return res.status(403).json({
        title: 'Wrong ',
        error: {message: 'Please check'}
      })
    }
    return res.status(200).json({
      message: 'Successfull',
      obj: obj
    })
  });
});






//update
router.put('/updateoption', function (req, res, next) {

  if(req.user.role[0] !== 'admin') {
    return res.status(404).json({
      title: 'Cannot edit Homepage',
      error: {message: 'Cannot edit Homepage!'}
    })
  }

  Option
  .findOne()
  .exec(function (err, item) {
  //Options.findById(({_id: req.params.id}), function (err, item) {
    if (err) {
      return res.status(404).json({
        message: 'Not found',
        err: err
      })
    } else {
      item.design = req.body.design
      item.save(function (err, result) {
        if (err) {
          return res.status(404).json({
            message: 'There was an error, please try again',
            err: err
          });
        }
        res.status(201).json({
          message: 'Successfully',
          obj: result
        });
      });

    }
  })
});






router.post('/', function (req, res, next) {
  var option = new Option(req.body)
  option.user = req.user._id

  option.save(function (err, result) {
    if (err) {
      return res.status(403).json({
        title: 'There was an issue',
        error: {message: 'error'}
      })
    }
    res.status(200).json({
      message: 'Ok',
      obj: result
    })
  })
})











module.exports = router;
