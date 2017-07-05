var express = require('express'),
    router  = express.Router(),
    config  = require('../config/config'),
    User    = require('../models/user.model'),
    Product    = require('../models/product.model'),
    Form    = require('../models/form.model'),
    fs      = require('fs'),
    jwt     = require('jsonwebtoken'),
    stripe  = require("stripe")("sk_test_cg4vcpE5gV1ApywsErwoWL7u");

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





//
// router.get('/getStripeCard', function (req, res, next) {
//   // console.log(req.user.paiement.stripe.cardId)
//     if(!req.user.paiement.stripe.cardId) {
//       return res.status(404).json({
//         title: 'No data',
//         error: 'noData'
//       });
//     }
//     console.log(req.user.paiement.stripe.cusId, req.user.paiement.stripe.cardId)
//     stripe.customers.retrieveCard(req.user.paiement.stripe.cusId, req.user.paiement.stripe.cardId,
//       function(err, card) {
//         if(err) {
//           return res.status(404).json({
//             title: 'No data in stripe',
//             error: 'noData'
//           });
//         } else {
//           return res.status(200).json({
//             customer: card
//           })
//         }
//       }
//     );
// })

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


//
// router.get('/getStripeSubscription', function (req, res, next) {
//     if(!req.user.paiement.stripe.subId) {
//       return res.status(404).json({
//         title: 'No data',
//         error: 'noData'
//       });
//     }
//     stripe.subscriptions.retrieve(req.user.paiement.stripe.subId,
//       function(err, subscription) {
//         if(err) {
//           return res.status(404).json({
//             title: 'No data in stripe',
//             error: 'noData'
//           });
//         } else {
//           return res.status(200).json({
//             customer: subscription
//           })
//         }
//       }
//     );
// })



router.post('/saveCustInStripe/', function (req, res, next) {
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
      }).catch((error) => {
        return res.status(404).json({
          title: 'Error not saved in db',
          error: error
        });
      });
    }).catch((error) => {
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
});
router.post('/saveCardInStripe/', function (req, res, next) {
  if(req.user.paiement.stripe.cusId) {
    createCardInStripe(req.user.paiement.stripe.cusId)
    .then((card) => {
      // console.log('aa')
      // if(card) {
        return res.status(200).json({
          card: card
        })
      // } else {
      //   return res.status(404).json({
      //     title: 'Error',
      //     error: 'error'
      //   });
      // }
    })
    .catch((error) => {
      // console.log('bb')
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
  }
});
router.post('/saveSubscriptionInStripe/', function (req, res, next) {
  // if(req.user.paiement.stripe.subId) {
    createSubInStripe(req.user.paiement.stripe.cusId)
    .then(function(subscription){
        // if(item) {
          return res.status(200).json({
            subscription: subscription
          })
        // } else {
        //   return res.status(404).json({
        //     title: 'No data in stripe',
        //     error: 'noData'
        //   });
        // }
    })
    .catch((error) => {
      return res.status(404).json({
        title: 'Error Not saved in stripe',
        error: error
      });
    });
  // }
});





// function updateStripeSubIdToDb(req, subscription){
//   let paiement = req.user.paiement
//   paiement.stripe.subId = subscription.id
//   return new Promise(function(resolve, reject) {
//     User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
//       if (err) { resolve(item) } else { reject(err) }
//     });
//   })
// }
function updateStripeCustomerIdToDb(req, customer){
  let paiement = req.user.paiement
  paiement.stripe.cusId = customer.id
  return new Promise(function(resolve, reject) {
    User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
      if (item) { resolve(item) } else { reject(err) }
    });
  })
}

// function updateStripeCardIdToDb(req, card){
//   let paiement = req.user.paiement
//   paiement.stripe.cardId = card.id
//
//   return new Promise(function(resolve, reject) {
//     User.update({ _id: req.user._id }, { $set: { paiement: paiement}}, function (err, item) {
//       if (err) { resolve(item) } else { reject(err) }
//     });
//   })
// }


function createCustomerInStripe() {
  return new Promise(function(resolve, reject) {
    stripe.customers.create({
      description: 'Customer for alan345alan@gmail.com',
      email: 'alan345alan@gmail.com'
    }, function(err, customer) {
      if(customer){
        console.log("customer Created in Stripe")
        console.log(customer)
        resolve(customer)
      } else {
        console.log(err)
        reject(error)
      }
    })
  })
}



function createSubInStripe(cusId){
    return new Promise(function(resolve, reject) {
      stripe.subscriptions.create({
        customer: cusId,
        plan: "gold"
      }, function(err, subscription) {
        if(subscription) {
          console.log(subscription)
          resolve(subscription)
        } else {
          console.log(err)
          reject(err)
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
            resolve(card)
          } else {
            console.log(err)
            reject(err)
          }
        }
      );
  })
}





module.exports = router;
