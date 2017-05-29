var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken');
    Options    = require('../models/options.model'),

// this process does not hang the nodejs server on error
process.on('uncaughtException', function (err) {
  console.log(err);
});




router.get('/', function (req, res, next) {
  Options
  .findOne()
  .populate('design.mainPage._imgHome1')
  .populate('design.mainPage._imgHome2')
  .populate('design.mainPage._imgHome3')
  .populate('design.mainPage._imgHome4')
  .populate('design.mainPage._imgHome5')
  .populate('design.mainPage._imgHome6')
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


//Checking if user is authenticated or not, security middleware
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
        error: {message: 'Authentication failed, malformed jwt'}
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





//get all forms from database. Must be depracted
router.get('/pureOptions', function (req, res, next) {
  Options.findOne({}, function (err, obj) {
    if (err) {
      return res.status(403).json({
        title: 'There was a problem',
        error: err
      });
    }
    if (!obj) {
      return res.status(403).json({
        title: 'Wrong Email or Password',
        error: {message: 'Please check if your password or email are correct'}
      })
    }
    return res.status(200).json({
      message: 'Successfull',
      obj: obj
    })
  })
});





// {
//     "_id": {
//         "$oid": "58dd4ad1734d1d01a23880fa"
//     },
//     "design": {
//         "mainPage": {
//             "_imgHome1": [
//                 {
//                     "$oid": "58f0041f09fd3658afac7cd2"
//                 }
//             ],
//             "_imgHome2": [
//                 {
//                     "$oid": "58f0040b09fd3658afac7cd1"
//                 }
//             ],
//             "_imgHome3": [
//                 {
//                     "$oid": "58f0043c09fd3658afac7cd3"
//                 }
//             ],
//             "_imgHome4": [
//                 {
//                     "$oid": "58f0045209fd3658afac7cd4"
//                 }
//             ],
//             "_imgHome5": [
//                 {
//                     "$oid": "58f0046609fd3658afac7cd5"
//                 }
//             ],
//             "_imgHome6": [
//                 {
//                     "$oid": "58f0047809fd3658afac7cd6"
//                 }
//             ]
//         }
//     },
//     "createdAt": {
//         "$date": "2017-04-13T23:26:33.751Z"
//     },
//     "updatedAt": {
//         "$date": "2017-04-13T23:26:33.751Z"
//     }
// }



//update
router.put('/updateoption', function (req, res, next) {

  if(req.user.role[0] !== 'admin') {
    return res.status(404).json({
      title: 'Cannot edit Homepage',
      error: {message: 'Cannot edit Homepage!'}
    })
  }

  Options
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















module.exports = router;
