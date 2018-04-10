var Notification = require('../models/notification.model'),
  User = require('../models/user.model'),
  TypeRights = require('../models/typeRights.const'),
  User = require('../models/user.model'),
  Quote = require('../models/quote.model'),
  Companie = require('../models/companie.model'),
  path = require("path"),
  pdf = require('html-pdf');





module.exports = {
  options : {
    format: 'Letter',
    "header": {
      "height": "70px"
    },
    "footer": {
      "height": "0px"
    },
    "border": "10px"
  },


  generatePDF (req, res, next, type, typeExtract) {
    return new Promise(function(resolve, reject) {
      // User
      // .findOne({_id: req.user._id})
      // .populate({path: 'forms', model: 'Form'})
      // .populate({path: 'rights', model: 'Right'}).populate({path: 'salesMan', model: 'User'}).populate({path: 'ownerCompanies', model: 'Companie'}).populate({path: 'profile.profilePicture', model: 'Form'})
      // .exec(function(err, user) {
      //   if (err) {
      //     return res.status(403).json({title: 'There was a problem', error: err})
      //   }
      //
      //   if (!user) {
      //     return res.status(404).json({
      //       title: 'No form found',
      //       error: {
      //         message: 'Item not found!'
      //       }
      //     })
      //   }

        // Companie.findById(user.ownerCompanies[0]).populate({path: 'forms', model: 'Form'}).populate({path: 'rights', model: 'Right'}).exec(function(err, companie) {
        //   if (err) {
        //     return res.status(404).json({message: '', err: err})
        //   }
        //   if (!companie) {
        //     return res.status(404).json({
        //       title: 'No obj found',
        //       error: {
        //         message: 'Obj not found!'
        //       }
        //     })
        //   } else {

            // Quote
            // .findOne({_id: req.params.quoteId})
            // .populate({path: 'forms', model: 'Form'})
            // .populate({path: 'rights', model: 'Right'}).populate({path: 'salesMan', model: 'User'}).populate({path: 'ownerCompanies', model: 'Companie'}).populate({path: 'profile.profilePicture', model: 'Form'})
            // .exec(function(err, obj) {
            //
            // // findById((req.params.quoteId), function(err, obj) {
            //   if (err) {
            //     return res.status(500).json({message: 'An error occured', err: err})
            //   }
            //   if (!obj) {
            //     return res.status(404).json({
            //       title: 'No form found',
            //       error: {
            //         message: 'Form not found!'
            //       }
            //     })
            //   }

              // let findQuery = {}
              // findQuery['_id'] = req.params.id

              Quote.findById({_id: req.params.quoteId})
              .populate({
                path: 'projects',
                model: 'Project',
                populate: {
                  path: 'assignedTos',
                  model: 'User'
                }
              })
              .populate({path: 'signature.users', model: 'User'})
              .populate({path: 'clients', model: 'User'})
              .populate({
                path: 'ownerCompanies',
                model: 'Companie',
                populate: {
                  path: 'forms',
                  model: 'Form'
                }
              })
              .populate({
                path: 'devisDetails.bucketProducts.productInit',
                model: 'Product',
                populate: {
                  path: 'forms',
                  model: 'Form'
                }
              }).exec(function(err, item) {
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

                  var quoteNumber = ''
                  var historyClientsName = ''
                  item.ownerCompanies.forEach(companie => {
                    if(type === 'quote') {
                      quoteNumber = companie.quoteSettings.prefixQuote
                    }
                    if(type === 'invoice') {
                      quoteNumber = companie.quoteSettings.prefixInvoice
                    }
                  })
                  quoteNumber += item.quoteNumber

                  var html = ''
                  html += `
                 <head><link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
                 <style type="text/css">

                                          .col-1 {
                                            width: 8.33%;
                                          }
                                          .col-2 {
                                            width: 16.66%;
                                          }
                                          .col-3 {
                                            width: 25%;
                                          }
                                          .col-4 {
                                            width: 33.33%;
                                          }
                                          .col-5 {
                                            width: 41.66%;
                                          }
                                          .col-6 {
                                            width: 50%;
                                          }
                                          .col-7 {
                                            width: 58.33%;
                                          }
                                          .col-8 {
                                            width: 66.66%;
                                          }
                                          .col-9 {
                                            width: 75%;
                                          }
                                          .col-10 {
                                            width: 83.33%;
                                          }
                                          .col-11 {
                                            width: 91.66%;
                                          }
                                          .col-12 {
                                            width: 100%;
                                          }
                                          .img {
                                            height: 20px;
                                          }
                                          .imgSignature {
                                            height: 45px;
                                          }
                                          .imglogo {
                                            height: 50px;
                                            text-align: center;
                                           display: block;
                                           margin-left: auto;
                                           margin-right: auto
                                          }
                                          .tabo {
                                            border: 1px solid #ddd;
                                          }
                                          .bgh {
                                            background-color: #595959;
                                            color: white;
                                            border: 1px solid #ddd;
                                          }
                                          .bghFree {
                                            /*background-color: #595959;
                                            color: #595959;
                                            border: 1px solid #ddd; */
                                          }
                                          .desc {
                                            text-align: left;
                                          }
                                          .elem {
                                            text-align: center;
                                            font-size: 9px;
                                          }
                                          .smallSize {
                                            font-size: 9px;
                                          }
                                          .titleGooplus1 {
                                            font-size: 11px;
                                          }
                                          .alright {
                                            text-align: right;
                                          }
                                          .inf {
                                            font-size: 10px;
                                          }
                                          .inf2 {
                                            font-size: 9px;
                                          }
                                          .nobo {
                                            border-top: none!important;
                                            border-bottom: none!important;
                                          }
                                          .cobo {
                                            border: 1px solid #ddd;
                                          }
                                          table {
                                            border-collapse: collapse;
                                            width: 100%;
                                          }
                                          td {
                                            height: 20px;
                                            vertical-align: center;
                                            border-left: 1px solid #ddd;
                                            border-right: 1px solid #ddd;
                                          }
                                          th {
                                            /*font-size: 10px;*/
                                          }
                                           .cgv {
                                            font-size: 6px;
                                           text-align: center!important;
                                          }
                                           p  {
                                            font-size: 9px;
                                             font-weight: 300;
                                          }
                                          .ts {
                                            background-color: #aba4a4;
                                            font-weight: bold;
                                          }
                                          #pageHeader {
                                            width:100%;
                                            height: 50px;
                                         }
                                         .avoid {
                                             page-break-inside: avoid !important;
                                             margin: 4px 0 4px 0;  /* to keep the page break from cutting too close to the text in the div */
                                           }
                                        #pageBody {height: 0px;}
                                        .test2 {margin-bottom: -50px; }
                 </style>
                  </head>`
                  // html += '<div id="pageHeader" class="col-12">'

                  // html +=  '<img class="imglogo" src="http://localhost/uploads/forms/5a15d4b688f48195f24e0345/5de6.alan.jpeg">'
                  // html +=  '<img class="imglogo" src="http://belmard-renovation.fr/wp-content/uploads/2017/10/belmard_logo_100.png">'

                  // html += '</div>'
                  // html += `

// console.log(path.join(__dirname,  '..'))
// fetchedCompanie.quoteSettings.prefixIntervention
                  item.ownerCompanies.forEach(companie => {
                    companie.forms.forEach(form => {

                      // html +=  'http://localhost/uploads/forms/' + form.owner + '/' + form.imagePath
                      // html +=  '<img class="imglogo" src="http://belmard-renovation.fr/wp-content/uploads/2017/10/belmard_logo_100.png">'
                      // html +=  '<img class="imglogo" src="' + 'https://app.belmard-batiment.fr/uploads/forms/' + form.owner + '/' + form.imagePath + '">'
                      html +=  '<img class="imglogo" src="file:///' + path.join(__dirname,  '..') + '/uploads/forms/' + form.owner + '/' + form.imagePath + '">'
                      // html +=  '<img class="imglogo" src="file:///Users/alan/app/saas/server/uploads/forms/5a15d4b688f48195f24e0345/5de6.alan.jpeg">'
                      // html +=   __dirname + '/uploads/forms/' + form.owner + '/' + form.imagePath
                      // html +=  '<img class="imglogo" src="http://localhost/uploads/forms/5a15d4b688f48195f24e0345/5de6.alan.jpeg">'
                    })
                  })




                  html += `
                    <table class="print-friendly">
                           <thead>
                             <tr>`
                             if(type === 'quote') {
                               html += '<p>'
                               html += 'Devis : ' + quoteNumber
                               html += '</p>'
                             }
                             if(type === 'invoice') {
                               html += '<p>'
                               html += 'Facture : ' + quoteNumber
                               html += '</p>'
                               if(item.statusQuote === 'paid') {
                                 html += '<p><b>'
                                 html += 'Payé'
                                 html += '</b></p>'
                              }
                             }
                             item.ownerCompanies.forEach(companie => {
                               html += '<th class="col-5 desc cobo">'
                                 html += '<p><b>'
                                 html += 'Belmard Rénovation'
                                 html += '</b></p>'
                                 companie.address.forEach(singleAddress => {
                                   html += '<p>'
                                   html += '30, rue Belgrand'
                                   html += '</p>'
                                   html += '<p>'
                                   html += '75020 Paris'
                                   html += '</p>'
                                   html += '<p>'
                                   html += 'Tel : 01 40 33 88 33'
                                   html += '</p>'
                                 })

                                 html += '<p>'
                                 html += 'contact@belmard-renovation.fr'
                                 html += '</p>'
                               html += '</th>'
                            })


            html += `         <th class="col-2"></th>
                               <th class="col-5 desc cobo">`



                   item.historyClients.forEach(user => {
                     historyClientsName =  user.profile.name + '_' + user.profile.lastName
                     // console.log(user)
                     html += '<p><b>'
                     html += user.profile.title + ' ' + user.profile.name + ' ' + user.profile.lastName
                     html += '</b></p>'
                   })



                  item.historyClientsCross.forEach(user => {
                    // historyClientsName =  user.profile.name + ' ' + user.profile.lastName
                    // console.log(user)
                    // html += '<p><b>'
                    // html += user.profile.title + ' ' + user.profile.name + ' ' + user.profile.lastName
                    // html += '</b></p>'
                    user.profile.address.forEach(singleAddress => {
                      // if (singleAddress.nameAddress === 'billing') {
                        html += '<p>'
                        html += singleAddress.address + ' ' + singleAddress.address2
                        html += '</p>'
                        html += '<p>'
                        html += singleAddress.zip + ' ' + singleAddress.country
                        html += singleAddress.city + ' ' + singleAddress.state + ' '
                        html += '</p>'
                      // }
                    })

                    html += '<p>'
                    html += 'Tel : ' + user.profile.phoneNumber
                    html += '</p><p>'
                  })

                  item.historyClients.forEach(user => {
                    html += 'Mail : ' + user.email
                    html += '</p>'
                  })
                  html += `
                               </th>
                             </tr>
                           </thead>
                         </table>
                         <br>
                         <table class="cobo">
                           <thead>
                             <tr>
                               <th class="col-12 desc smallSize"><b>Objet :</b> ` + item.name + `
                               </th>
                             </tr>
                           </thead>
                         </table>
                         <br>
                         <table class="tabo">
                           <thead>
                             <tr>
                             <th class="col-5 bgh titleGooplus1">Description</th>
                             <th class="col-2 bgh titleGooplus1">Illustration</th>
                             <th class="col-1 bgh titleGooplus1">UNIT.</th>
                             <th class="col-1 bgh titleGooplus1">Qté</th>
                             <th class="col-1 bgh titleGooplus1">PU</th>
                             <th class="col-1 bgh titleGooplus1">Total HT</th>
                             <th class="col-1 bgh titleGooplus1">TVA</th>
                             </tr>
                           </thead>
                           <tbody>`
                  item.devisDetails.forEach(devisDetail => {

                    devisDetail.bucketProducts.forEach(bucketProduct => {
                      html += '<tr class="bghFree">'
                      let description = ''
                      let img = ''
                      let unit = ''
                      if (bucketProduct.typeRow === 'text') {
                        description = bucketProduct.title
                      }
                      if (bucketProduct.typeRow === 'product') {
                        bucketProduct.productInit.forEach(product => {
                          description = product.details.referenceName
                          unit = product.details.unit
                          product.forms.forEach(form => {
                            img = '<img class="img" src="' + 'http://localhost/uploads/forms/' + form.owner + '/' + form.imagePath + '">'
                          })
                        })
                      }
                      html += '<td class="desc bghFree"><div class="avoid bghFree"><p>' + description + '</p></div></td>'
                      html += '<td class="elem">' + img + '</td>'
                      html += '<td class="desc bghFree">' + unit + '</td>'
                      html += '<td class="elem">' + bucketProduct.quantity + '</td>'
                      html += '<td class="elem bghFree"><div class="data bghFree"><p>' + bucketProduct.priceWithoutTaxes + '</p></div></div></td>'
                      html += '<td class="elem bghFree"><div class="data bghFree"><p>' + bucketProduct.priceWithoutTaxes + '</p></div></td>'
                      html += '<td class="elem bghFree"><div class="data bghFree"><p>TVA</p></div></td>'
                      // html += '<td class="elem">' + bucketProduct.vat + '%</td>'
                      html += '</tr>'

                    })
                  })

                  html += `
                           </tbody>
                         </table>
                         <br>



<table>
  <tr>
    <td class="col-8"></td>
    <td class="col-2 alright"></td>
    <td class="col-2 ts elem">TOTAL</td>
  </tr>`

  if (item.priceQuote.discountGlobal !== 0) {
    html += `
    <tr>
      <td class="col-8"></td>
      <td class="col-2 alctr ts elem">Sous-Total HT</td>
      <td class="col-2 elem">
        <b>`
        html += Math.round(item.priceQuote.priceQuoteWithoutTaxes)
        html += item.detail.currency
        // item.ownerCompanies.forEach(companie => {
        //   if (companie.option.currency) {
        //     html += companie.option.currency
        //   }
        // })
        html += `
        </b>
      </td>
    </tr>`
    html += `
    <tr>
      <td class="col-8"></td>
      <td class="col-2 alctr ts elem">Remise</td>
      <td class="col-2 elem"><b>` + item.priceQuote.discountGlobal + `%</b></td>
    </tr>`
  }
  html += `
  <tr>
    <td class="col-8"></td>
    <td class="col-2 alctr ts elem">TotaL HT</td>
    <td class="col-2 elem">
      <b>`
        html += Math.round(item.priceQuote.priceGlobalWithDiscount)
        html += item.detail.currency
        // item.ownerCompanies.forEach(companie => {
        //   if (companie.option.currency) {
        //     html += companie.option.currency
        //   }
        // })
        html += `
      </b>
    </td>
  </tr>
  <tr>
    <td class="col-8"></td>
    <td class="col-2 alctr ts elem">TVA</td>
    <td class="col-2 elem"><b>` + item.priceQuote.vatGlobal + `%</b></td>
  </tr>
  <tr>
    <td class="col-8"></td>
    <td class="col-2 alctr ts elem">TOTAL TTC</td>
    <td class="col-2 elem">
      <b>`
        html += Math.round(item.priceQuote.priceGlobalWithTaxesWithDiscount)
        html += item.detail.currency
        // item.ownerCompanies.forEach(companie => {
        //   if (companie.option.currency) {
        //     html += companie.option.currency
        //   }
        // })
        html += `
      </b>
    </td>
  </tr>
</table>


                         <br>
                         <table>
                           <thead>
                             <tr>

                               <th class="col-8 desc bghFree">`
                               item.legalApprovals.forEach(legalApproval => {
                                 html += '<p>' + legalApproval + '</p>'
                               })
                                //  <p>Le client rennonce au delai de retractation</p>
                                //  <p>Le client autorise l'entreprise a collecter les pieces a recup</p>
                  html += `
                               </th>`
                   if(type === 'quote') {
                      html += `

                               <th class="col-3 desc">
                               <p class="alctr">Signature</br> `
                                  item.clients.forEach(user => {
                                    html += user.profile.title + ' ' + user.profile.name + ' ' + user.profile.lastName
                                  })
                                  html += `
                                </p>
                                  `

                                if (item.drawingSignature.namePicture) {
                                  html += '<img class="imgSignature" src="file:///' + path.join(__dirname, '..') + '/uploads/signature/' + item.drawingSignature.namePicture + '" />'
                                  // console.log('<img class="imgSignature" src="file:///' + path.join(__dirname, '..') + '/uploads/signature/' + item.drawingSignature.namePicture + '" />')
                                }


// html +=  '<img class="imglogo" src="file:///' + path.join(__dirname,  '..') + '/uploads/forms/' + form.owner + '/' + form.imagePath + '">'




                                html += `<p class="inf2">Le `
                                if (item.drawingSignature.dateSignature)
                                  html += item.drawingSignature.dateSignature.toLocaleDateString("fr-FR")

            html += `
                              </p>
                              </th>`
                            }
            html += `
                             </tr>
                           </thead>
                         </table>
                      <br>
                      <a class="cgv">`


                      item.ownerCompanies.forEach(companie => {
                        if(type === 'quote') {
                          html +=  companie.quoteSettings.legalNotice
                        }
                        if(type === 'invoice') {
                          html +=  companie.quoteSettings.legalNoticeInvoice
                        }
                      })


                      html += `



                      </a>
                        `

                  var nameFile = quoteNumber + '_' + historyClientsName + '.pdf'
                  nameFile = nameFile.replace(/\s+/g, '_')
                  // console.log(nameFile)
                  if(typeExtract === 'stream') {
                    pdf.create(html, this.options).toStream(function(err, stream) {
                      if (err) {
                        console.log(err)
                        reject(err)
                      } else {
                        res.body = nameFile
                        // console.log(res.nameFile)
                        stream.pipe(res)
                        // resolve(stream)
                      }
                    })
                  }
                  if(typeExtract === 'file') {
                    pdf.create(html, this.options).toFile('./server/uploads/pdf/' + nameFile, function(err, resPDF) {
                      if (err) {
                        console.log(err)
                        reject(err)
                      } else {
                        resolve(nameFile)
                      }
                    })
                  }
                }
            //   })
            // })
          // }
        // })
      })
    })
  },

  generatePaiementQuotePDF (req, res, next) {

  }

}
