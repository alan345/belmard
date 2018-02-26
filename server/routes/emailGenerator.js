var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    Quote = require('../models/quote.model'),
    passwordHash = require('password-hash'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    config      = require('../config/config');


var transportOptions = {
  // service: "Gmail",
  host: config.hostName,
  port: config.port,
  auth: {
    user: config.userGmail,
    pass: config.passGmail
  }
}

module.exports = {
  sendWelcomeEmail (user) {
    var html = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#ff4351" height="150">
                    <img
                      src="http://mirabelle.io/wp-content/uploads/2018/01/Logo-mail.png"
                      alt="Email de la part de Mirabelle" style="display: block; color: #ffffff;"
                    />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          Bonjour ${user.profile.name}!
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">

                              Bienvenue sur Mirabelle.io. Votre inscription s'est déroulée avec succès. Vous pouvez désormais accéder aux fonctionnalités de Mirabelle.io.
                              Votre email de connexion est <b>${user.email}</b>, vous êtes le seul à connaître votre mot de passe.
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="background-color: #fff; padding: 10px 15px;">
                          <a
                            href="https://app.mirabelle.io"
                            style="background-color: #ff4351; padding: 10px 15px; border: none; outline: none; color: #ffffff; text-decoration: none;"
                          >
                            Se connecter
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          L'équipe Mirabelle vous remercie de votre confiance.

                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                           Mirabelle, Faites vos devis chez vos clients!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ff4351">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="https://www.mirabelle.io/" style="text-decoration: none;">Site Web Mirabelle</a>
                      </td>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="mailto:hello@mirabelle.io?Subject=false%reset" style="text-decoration: none;">Nous contacter</a>
                      </td>
                     </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>


    `
    var mailer = nodemailer.createTransport(transportOptions);

    var mailOptions = {
      to: user.email,
      from: 'hello@mirabelle.io',
      subject: 'Bienvenue sur Mirabelle!',
      html: html
    };
    mailer.sendMail(mailOptions, function(err) {
      console.log('info', 'Un message a été envoyé à ' + user.email + ' avec de plus amples informations.');
      return res.status(200).json({
        message: 'Succès'
      })
    });


  },
  sendUnscribeMailToGooplus (reasonToUnscribe) {
    var html = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#ff4351" height="150">
                    <img
                      src="http://mirabelle.io/wp-content/uploads/2018/01/Logo-mail.png"
                      alt="Email de la part de Mirabelle" style="display: block; color: #ffffff;"
                    />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          DESINSCRIPTION. RAISON: ${reasonToUnscribe}
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
    `
    var mailer = nodemailer.createTransport(transportOptions);

    var mailOptions = {
      to: 'hello@mirabelle.io',
      from: 'hello@mirabelle.io',
      subject: 'Bienvenue sur Mirabelle!',
      html: html
    };
    mailer.sendMail(mailOptions, function(err) {
      // console.log('info', 'Un message a été envoyé à ' + user.email + ' avec de plus amples informations.');
      // return res.status(200).json({
      //   message: 'Succès'
      // })
    });


  },
  sendQuoteByEmailToClient (req, res, next, type) {
    return new Promise(function(resolve, reject) {
      Quote.findById({_id: req.params.quoteId})
      .populate({path: 'clients', model: 'User'})
      .exec(function(err, item) {
        if (err) {
          return res.status(404).json({message: '', err: err})
        }
        if (!item) {
          // console.log('e')
          return res.status(404).json({
            title: 'No obj found',
            error: {
              message: 'Obj not found!'
            }
          })
        } else {

          var user = {}
          item.clients.forEach(client => {
            user = client
          })


      async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function(token, done) {
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });

        },
        function(token, user, done) {
          var mailer = nodemailer.createTransport(transportOptions)
          var html = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email depuis Mirabelle</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">

                <tr>
                  <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>Bonjour ${user.profile.title} ${user.profile.name} ${user.profile.lastName},</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          `
                            if(type ==='quote') {
                              html += 'Le devis'
                            }
                            if(type ==='invoice') {
                              html += 'La facture'
                            }

                          html += `
                          de votre prestataire est disponible sur Mirabelle.
                        </td>
                      </tr>

                      <tr>
                        <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
                          <a
                            href="http://${req.headers.host}/#/userAccount/reset/${token}"
                            style="color: #ffffff; text-decoration: none;"
                          >
                            Voir le Document
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `;
          var mailOptions = {
            to: user.email,
            from: config.userGmail,
            subject: 'Mirabelle.io | Invitation',
            html: html
          };
          mailer.sendMail(mailOptions, function(err) {
            console.log('info', 'Un email à été envoyé à ' + user.email + ' avec les instructions à suivre.');
            // return res.status(200).json({message: 'Success', token: 'InMail'})
            resolve({message: 'Success', token: 'InMail'})
          });
        }
      ], function(err) {
        console.log(err)
        if (err) {
          reject(err);
          return next(err);

        }
        }
      );

              }
            })
    })
  },
//   sendQuoteByEmailToClient(req, res, next, type) {
//
//     return new Promise(function(resolve, reject) {
//       Quote.findById(req.params.quoteId)
//       .populate({path: 'clients', model: 'User'})
//       .populate({path: 'ownerCompanies', model: 'Companie'})
//         .exec(function(err, obj) {
//         if (err) {
//           reject(new Error({message: 'An error occured', err: err}))
//         }
//         if (!obj) {
//           reject(new Error({
//             title: 'No form found',
//             error: {
//               message: 'Form not found!'
//             }
//           }))
//         }
//         var nameCompanie = ''
//         var emailCompanie = ''
//         obj.ownerCompanies.forEach(companie => {
//           nameCompanie = companie.nameCompanie
//           emailCompanie = companie.email
//         })
//
//
//
//         obj.clients.forEach(client => {
//
//           var html = `
//             <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//             <html xmlns="http://www.w3.org/1999/xhtml">
//               <head>
//                 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//                 <title>Email de Mirabelle.io</title>
//                 <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
//               </head>
//               <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
//                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
//
//                   <tr>
//                     <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
//                       <table border="0" cellpadding="0" cellspacing="0" width="100%">
//                         <tr>
//                           <td>Bonjour ${client.profile.title} ${client.profile.name} ${client.profile.lastName},</td>
//                         </tr>
//                         <tr>
//                           <td style="padding: 15px 0 30px 0;">
//                             Merci de trouver votre `
//                               if(type ==='quote') {
//                                 html += ' Devis'
//                               }
//                               if(type ==='invoice') {
//                                 html += ' Facture'
//                               }
//
// html += `
//                           </td>
//                         </tr>
//                         <tr>
//                           <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
//                             <a
//                               href="http://${req.headers.host}/uploads/pdf/${req.params.quoteId}"
//                               style="color: #ffffff; text-decoration: none;"
//                             >`
//                               if(type ==='quote') {
//                                 html += ' Consulter le Devis'
//                               }
//                               if(type ==='invoice') {
//                                 html += ' Consulter la facture'
//                               }
// html += `
//                             </a>
//                           </td>
//                         <tr>
//                           <td style="padding: 15px 15px 15px 15px;">De la part de ${nameCompanie}
//                           </td>
//                      </tr>
//
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//                 </table>
//               </body>
//             </html>
//             `;
//
//           var mailer = nodemailer.createTransport({
//             // service: "Gmail",
//             host: config.hostName,
//             port: config.port,
//             auth: {
//               user: config.userGmail,
//               pass: config.passGmail
//             }
//           })
//
//           var typeQuoteNew = ''
//           if(type === 'quote') {
//             typeQuoteNew += 'Nouveau Devis'
//           }
//           if(type === 'invoice') {
//             typeQuoteNew += 'Nouvelle Facture'
//           }
//
//
//           var mailOptions = {
//             to: client.email,
//             from: emailCompanie,
//             subject: nameCompanie + ' | ' + typeQuoteNew,
//             html: html
//           };
//           console.log(mailOptions)
//           mailer.sendMail(mailOptions, function(err) {
//             if(err) {
//               // console.log('ttt')
//               reject(new Error({message: 'An error occured', err: err}))
//             }
//             // console.log('info', 'An e-mail has been sent.');
//             console.log({message: 'Success', obj: 'Mail sent to ' + client.email})
//             resolve({message: 'Success', obj: 'Mail sent to ' + client.email})
//           });
//         })
//       })
//     })
//   },
  sendMailResetPassword(token, req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          console.log(user)
          if(err) {
            return res.status(403).json({
              title: 'An error occured',
              error: err
            });
          }
          if(!user) {
            return res.status(403).json({
              title: 'There was an error',
              error: {message: 'Please check if your email is correct'}
            })
          }
          user.password = passwordHash.generate(req.body.password);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;


          user.save(function (err, result) {
            if (err) {
              return res.status(403).json({
                title: 'There was an issue',
                error: {message: 'The email you entered already exists'}
              });
            }
            res.status(200).json({
              message: 'Password updated',
              obj: result
            })
          })
        });
      },

      // sending notification email to user that his password has changed
      function(user, done) {
        // var options = {
        //   auth: {
        //     api_user: config.api_user,
        //     api_key:  config.api_key
        //   }
        // };
        // var mailer = nodemailer.createTransport(sgTransport(options));
        var mailer = nodemailer.createTransport(transportOptions);

        var mailOptions = {
          to: user.email,
          from: 'contact@mirabelle.io',
          subject: 'Modification du mot de passe sur Mirabelle',
          text: 'Bonjour,\n\n' +
          'Vous recevez cet email pour vous informer que la mot de passe pour du compte ' + user.email + ' a bien été modifié.\n'
        };
        mailer.sendMail(mailOptions, function(err) {
          console.log('info', 'Un message a été envoyé à ' + user.email + ' avec de plus amples informations.');
          return res.status(200).json({
            message: 'Succès'
          })
        });
      }
    ], function(err) {
      if (err) {
      }
    });
  },
  sendForgetEmail(req, res, next) {
      async.waterfall([
        function (done) {
          crypto.randomBytes(20, function (err, buf) {
            var token = buf.toString('hex');
            done(err, token);
          });
        },
        function (token, done) {
          User.findOne({email: req.body.email}, function (err, user) {
            if (err) {
              return res.status(403).json({
                title: 'There was an error',
                error: err
              });
            }
            if (!user) {
              return res.status(403).json({
                title: 'Please check if your email is correct',
                error: {message: 'Please check if your email is correct'}
              })
            }

            user.resetPasswordToken   = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

            user.save(function (err) {
              done(err, token, user);
            });
          });
        },

        // sending the notification email to the user with the link and the token created above
        function (token, user, done) {
          var mailer = nodemailer.createTransport(transportOptions)


          var html = `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
              <title>Email</title>
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#ff4351" height="150">
                    <img
                      src="http://mirabelle.io/wp-content/uploads/2018/01/Logo-mail.png"
                      alt="Email de la part de Mirabelle" style="display: block; color: #ffffff;"
                    />
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          Vous recevez cet email car vous avez fait une demande de "mot de passe oublié" pour votre compte sur Mirabelle. Veuillez, s'il vous plait cliquer sur le bouton ci-dessous ou copier/coller le lien directement dans votre navigateur pour réinitialiser votre mot de passe :
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="background-color: #fff; padding: 10px 15px;">
                          <a
                            href="http://${req.headers.host}/#/userAccount/reset/${token}"
                            style="background-color: #ff4351; padding: 10px 15px; border: none; outline: none; color: #ffffff; text-decoration: none;"
                          >
                            Réinitialiser le mot de passe
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 0 30px 0;">
                          Lien direct : http://${req.headers.host}/#/userAccount/reset/${token}<br>
                          Le lien sera valide pendant une heure. Si vous n'avez pas demandé de réinitialisation de mot de passe, merci d'ignorer cet email.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ff4351">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="https://www.mirabelle.io/" style="text-decoration: none;">Site Web Mirabelle</a>
                      </td>
                      <td style="padding: 15px 15px 15px 15px;">
                        <a href="mailto:hello@mirabelle.io?Subject=Oubli de mot de passe" style="text-decoration: none;">Nous sontacter</a>
                      </td>
                     </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `;
          var mailOptions = {
            to: user.email,
            from: config.userGmail,
            subject: 'Mirabelle | Demande de changement de mot de passe  ',
            html: html
          };
          mailer.sendMail(mailOptions, function (err) {
            console.log('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            return res.status(200).json({
              message: 'Success',
              token:'InMail'
            })
          });
        }
      ], function (err) {
        console.log(err)
        if (err) return next(err);
      });
  },
  sendEmailToUserToJoinCompanie(req, user) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });

      },
      function(token, user, done) {
        var mailer = nodemailer.createTransport(transportOptions)
        var html = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Email depuis Mirabelle</title>
            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Montserrat', sans-serif;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc;">

              <tr>
                <td bgcolor="#ffffff" style="padding: 15px 15px 15px 15px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td>Bonjour ${user.profile.name} ${user.profile.lastName},</td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 0 30px 0;">
                        Vous êtes invité à rejoindre l'application Mirabelle.io
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="background-color: #0a2f87; padding: 10px 15px; cursor: pointer;">
                        <a
                          href="http://${req.headers.host}/#/userAccount/reset/${token}"
                          style="color: #ffffff; text-decoration: none;"
                        >
                          Accepter l'invitation
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
        `;
        var mailOptions = {
          to: user.email,
          from: config.userGmail,
          subject: 'Mirabelle.io | Invitation',
          html: html
        };
        mailer.sendMail(mailOptions, function(err) {
          console.log('info', 'Un email à été envoyé à ' + user.email + ' avec les instructions à suivre.');
          return res.status(200).json({message: 'Success', token: 'InMail'})
        });
      }
    ], function(err) {
      console.log(err)
      if (err)
        return next(err);
      }
    );
  }

}
