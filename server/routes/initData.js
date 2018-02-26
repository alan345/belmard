var express     = require('express'),
    router      = express.Router(),
    crypto      = require("crypto"),
    nodemailer  = require('nodemailer'),
    async       = require('async'),
    Quote = require('../models/quote.model'),
    passwordHash = require('password-hash'),
    sgTransport = require('nodemailer-sendgrid-transport'),
    Companie = require('../models/companie.model'),
    Product = require('../models/product.model'),
    config      = require('../config/config');


module.exports = {

  initCompanie (companieId) {
    // console.log('initCompanie')
    // console.log(companieId)
    return new Promise(function(resolve, reject) {
      // if(companie.typeCompanie === 'Plomber') {


          Companie.findById(({_id: companieId}), function (err, item) {
            // console.log('momomo')
            if (err) {
              return res.status(404).json({
                message: err,
                err: err
              })
            }
            var data =''

            data =`
              L'acceptation du présent devis vaut acceptation de la réalisation et des conditions générales de ventes.

              [ENTREPRISE] SAS au capital de [XX €] - N°Siret : [XX], immatriculée au RCS de [Ville], domiciliée au [Adresse], représentée par Monsieur [XX] en sa qualité de Président.

              Règlement par chèque à l'ordre de [ENTREPRISE]
              Règlement par virement :
              IBAN : [XX]
              BIC : [XX]
            `
            item.quoteSettings.legalNotice = data

            data =`
              L'acceptation de la présente facture vaut acceptation de la réalisation et des conditions générales de ventes.

              [ENTREPRISE] SAS au capital de [XX €] - N°Siret : [XX], immatriculée au RCS de [Ville], domiciliée au [Adresse], représentée par Monsieur [XX] en sa qualité de Président.

              Règlement par chèque à l'ordre de 
              Règlement par virement :
              IBAN : [XX]
              BIC : [XX]
            `
            item.quoteSettings.legalNoticeInvoice = data

            item.legalApprovals.push(`J'accepte les conditions générales de vente et accepte l'annulation du délai de rétractation légal`)
            item.legalApprovals.push(`J'autorise la société à récupérer les déchets et le matériel usagé à la fin de la prestation`)

            item.modelVATs = [10, 20]
            item.quoteSettings.prefixeQuote = 'quote-'
            item.quoteSettings.prefixeInvoice = 'fac-'

            item.save(function (err, result) {

              if (err) {
                reject(new Error({
                  message: 'There was an error, please try again',
                  err: err
                }));
              }
              // console.log('popoiuytuio')
              // console.log(result)
              resolve(result)
              })
            })
      // }
    })
  },
  initProducts (companie, user) {
    var product = new Product()

    
    
    
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Protections'
    product.details.description = 'Protections'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = '10'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Nettoyant détartrant'
    product.details.description = 'Nettoyant détartrant'
    product.details.price.sellingPrice = '13'
    product.details.price.costPrice = '11,19'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Détecteur de fuites gaz'
    product.details.description = 'Détecteur de fuites gaz'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = '14,69'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Ingrédients divers'
    product.details.description = 'Ingrédients divers'
    product.details.price.sellingPrice = '60'
    product.details.price.costPrice = '34,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mortier standard'
    product.details.description = 'Mortier standard'
    product.details.price.sellingPrice = '14,87'
    product.details.price.costPrice = '7,16'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Colle PVC'
    product.details.description = 'Colle PVC'
    product.details.price.sellingPrice = '6,24'
    product.details.price.costPrice = '5,84'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Scellement chimique'
    product.details.description = 'Scellement chimique'
    product.details.price.sellingPrice = '15,93'
    product.details.price.costPrice = '10,56'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Silicone Blanc'
    product.details.description = 'Silicone Blanc'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,42'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Silicone Translucide'
    product.details.description = 'Silicone Translucide'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,42'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Enduit Blanc'
    product.details.description = 'Enduit Blanc'
    product.details.price.sellingPrice = '16'
    product.details.price.costPrice = '14,73'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Joint blanc pour faience'
    product.details.description = 'Joint blanc pour faience'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = '12,42'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Déboucheur Chimique'
    product.details.description = 'Déboucheur Chimique'
    product.details.price.sellingPrice = '20'
    product.details.price.costPrice = '18,69'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Préparation, transport et déplacement'
    product.details.description = 'Préparation, transport et déplacement'
    product.details.price.sellingPrice = '10'
    product.details.price.costPrice = '10'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Main d\'œuvre'
    product.details.description = 'Main d\'œuvre'
    product.details.price.sellingPrice = '45'
    product.details.price.costPrice = '40'
    product.details.unit = 'H'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Evacuation et traitement des déchets'
    product.details.description = 'Evacuation et traitement des déchets'
    product.details.price.sellingPrice = '30'
    product.details.price.costPrice = '22,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Thermocouple universel'
    product.details.description = 'Thermocouple universel'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = '6,75'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Antigel pour circuit de chauffage bidon de 20L'
    product.details.description = 'Antigel pour circuit de chauffage bidon de 20L'
    product.details.price.sellingPrice = '83,57'
    product.details.price.costPrice = '65,25'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Antigel pour climatisation et sanitaire bidon de 20L'
    product.details.description = 'Antigel pour climatisation et sanitaire bidon de 20L'
    product.details.price.sellingPrice = '76'
    product.details.price.costPrice = '72'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Circulateur GRUNDFOSS Alpha 1  25-40/180'
    product.details.description = 'Circulateur GRUNDFOSS Alpha 1  25-40/180'
    product.details.price.sellingPrice = '284'
    product.details.price.costPrice = '189,24'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Circulateur GRUNDFOSS Alpha 1  25-60/180'
    product.details.description = 'Circulateur GRUNDFOSS Alpha 1  25-60/180'
    product.details.price.sellingPrice = '331'
    product.details.price.costPrice = '254,16'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Kit de raccordement pour circu'
    product.details.description = 'Kit de raccordement pour circu'
    product.details.price.sellingPrice = '23,5'
    product.details.price.costPrice = '20,93'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Colis mazout ou complet fioul '
    product.details.description = 'Colis mazout ou complet fioul '
    product.details.price.sellingPrice = '143'
    product.details.price.costPrice = '74,16'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Détecteur de fumée 10 ans'
    product.details.description = 'Détecteur de fumée 10 ans'
    product.details.price.sellingPrice = '48,5'
    product.details.price.costPrice = '36,45'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Jauge mécanique  OVENTROP'
    product.details.description = 'Jauge mécanique  OVENTROP'
    product.details.price.sellingPrice = '35'
    product.details.price.costPrice = '20,48'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Pot filtre à fioul'
    product.details.description = 'Pot filtre à fioul'
    product.details.price.sellingPrice = '45'
    product.details.price.costPrice = '36'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Purgeur automatique 3/8 '
    product.details.description = 'Purgeur automatique 3/8 '
    product.details.price.sellingPrice = '12,4'
    product.details.price.costPrice = '6,54'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet de vidange radiateur'
    product.details.description = 'Robinet de vidange radiateur'
    product.details.price.sellingPrice = '2,75'
    product.details.price.costPrice = '2,35'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Soupape 3 Bars avec Manomètre'
    product.details.description = 'Soupape 3 Bars avec Manomètre'
    product.details.price.sellingPrice = '17,3'
    product.details.price.costPrice = '15,39'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Support de vase d\'expansion'
    product.details.description = 'Support de vase d\'expansion'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = '13,28'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vase d\'expansion  externe 18L'
    product.details.description = 'Vase d\'expansion  externe 18L'
    product.details.price.sellingPrice = '55'
    product.details.price.costPrice = '37,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vase d\'expansion  externe 25L'
    product.details.description = 'Vase d\'expansion  externe 25L'
    product.details.price.sellingPrice = '65'
    product.details.price.costPrice = '25,19'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vase d\'expansion  externe 35L'
    product.details.description = 'Vase d\'expansion  externe 35L'
    product.details.price.sellingPrice = '82'
    product.details.price.costPrice = '48,41'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Boite de relai '
    product.details.description = 'Boite de relai '
    product.details.price.sellingPrice = '75'
    product.details.price.costPrice = '71,07'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Joint de brûleur Cougar'
    product.details.description = 'Joint de brûleur Cougar'
    product.details.price.sellingPrice = '7,5'
    product.details.price.costPrice = '4,58'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Sonde NTC pour chaudière IDRA '
    product.details.description = 'Sonde NTC pour chaudière IDRA '
    product.details.price.sellingPrice = '30'
    product.details.price.costPrice = '23,31'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Cellule'
    product.details.description = 'Cellule'
    product.details.price.sellingPrice = '60'
    product.details.price.costPrice = '37,71'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Cartouche filtre Oventrop'
    product.details.description = 'Cartouche filtre Oventrop'
    product.details.price.sellingPrice = '13,5'
    product.details.price.costPrice = '3,27'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Gicleur'
    product.details.description = 'Gicleur'
    product.details.price.sellingPrice = '13'
    product.details.price.costPrice = '7,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Bouchon purgeur pour radiateur '
    product.details.description = 'Bouchon purgeur pour radiateur '
    product.details.price.sellingPrice = '2,65'
    product.details.price.costPrice = '2,1'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude ou té de réglage OVENTROP'
    product.details.description = 'Coude ou té de réglage OVENTROP'
    product.details.price.sellingPrice = '16'
    product.details.price.costPrice = '7,31'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un robinet thermostatique OVENTROP'
    product.details.description = 'Forfait de remplacement d\'un robinet thermostatique OVENTROP'
    product.details.price.sellingPrice = '92'
    product.details.price.costPrice = '72'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Purgeur à volant 1/8'
    product.details.description = 'Purgeur à volant 1/8'
    product.details.price.sellingPrice = '1,67'
    product.details.price.costPrice = '1,08'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Corps de robinet thermostatique OVENTROP'
    product.details.description = 'Corps de robinet thermostatique OVENTROP'
    product.details.price.sellingPrice = '33'
    product.details.price.costPrice = '15'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet de radiateur simple'
    product.details.description = 'Robinet de radiateur simple'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = '7,16'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tête de robinet thermostatique OVENTROP'
    product.details.description = 'Tête de robinet thermostatique OVENTROP'
    product.details.price.sellingPrice = '24'
    product.details.price.costPrice = '14,07'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Fixation de chauffe eau'
    product.details.description = 'Fixation de chauffe eau'
    product.details.price.sellingPrice = '7,5'
    product.details.price.costPrice = '2,84'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Trépied pour CEE 50 à 200L'
    product.details.description = 'Trépied pour CEE 50 à 200L'
    product.details.price.sellingPrice = '45'
    product.details.price.costPrice = '30'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 100L vertical mural Blindé monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 100L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '442'
    product.details.price.costPrice = '352,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 150L vertical mural ACI monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 150L vertical mural ACI monophasé'
    product.details.price.sellingPrice = '600'
    product.details.price.costPrice = '504'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 150L vertical mural Blindé monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 150L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '475'
    product.details.price.costPrice = '379,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 200L vertical mural ACI monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 200L vertical mural ACI monophasé'
    product.details.price.sellingPrice = '665'
    product.details.price.costPrice = '553,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 200L vertical mural Blindé monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 200L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '500'
    product.details.price.costPrice = '412,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 250L stable ACI monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 250L stable ACI monophasé'
    product.details.price.sellingPrice = '985'
    product.details.price.costPrice = '936'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 250L stable Blindé monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 250L stable Blindé monophasé'
    product.details.price.sellingPrice = '745'
    product.details.price.costPrice = '631,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 300L stable ACI monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 300L stable ACI monophasé'
    product.details.price.sellingPrice = '956'
    product.details.price.costPrice = '820,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Forfait de remplacement d\'un chauffe eau électrique 300L stable Blindé monophasé'
    product.details.description = 'Forfait de remplacement d\'un chauffe eau électrique 300L stable Blindé monophasé'
    product.details.price.sellingPrice = '695'
    product.details.price.costPrice = '559,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 100L vertical mural Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 100L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '202,5'
    product.details.price.costPrice = '198'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 150L vertical mural ACI monophasé'
    product.details.description = 'Chauffe eau électrique 150L vertical mural ACI monophasé'
    product.details.price.sellingPrice = '476'
    product.details.price.costPrice = '373,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 150L stable Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 150L stable Blindé monophasé'
    product.details.price.sellingPrice = '550'
    product.details.price.costPrice = '415,8'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 150L vertical mural Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 150L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '395'
    product.details.price.costPrice = '246'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 200L horizontal ACI monophasé'
    product.details.description = 'Chauffe eau électrique 200L horizontal ACI monophasé'
    product.details.price.sellingPrice = '980'
    product.details.price.costPrice = '733,64'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 200L vertical mural ACI monophasé'
    product.details.description = 'Chauffe eau électrique 200L vertical mural ACI monophasé'
    product.details.price.sellingPrice = '560'
    product.details.price.costPrice = '420'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 200L stable Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 200L stable Blindé monophasé'
    product.details.price.sellingPrice = '612'
    product.details.price.costPrice = '456,87'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 200L vertical mural Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 200L vertical mural Blindé monophasé'
    product.details.price.sellingPrice = '425'
    product.details.price.costPrice = '222'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 250L stable Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 250L stable Blindé monophasé'
    product.details.price.sellingPrice = '482,4'
    product.details.price.costPrice = '501,94'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 300L stable ACI monophasé'
    product.details.description = 'Chauffe eau électrique 300L stable ACI monophasé'
    product.details.price.sellingPrice = '837'
    product.details.price.costPrice = '673,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe eau électrique 300L stable Blindé monophasé'
    product.details.description = 'Chauffe eau électrique 300L stable Blindé monophasé'
    product.details.price.sellingPrice = '595'
    product.details.price.costPrice = '409,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe-eau électrique 30L Blindé'
    product.details.description = 'Chauffe-eau électrique 30L Blindé'
    product.details.price.sellingPrice = '265'
    product.details.price.costPrice = '202,54'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Chauffe-eau électrique 50L Blindé '
    product.details.description = 'Chauffe-eau électrique 50L Blindé '
    product.details.price.sellingPrice = '265'
    product.details.price.costPrice = '202,54'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Kit d\'adaptation pour CEE ACI '
    product.details.description = 'Kit d\'adaptation pour CEE ACI '
    product.details.price.sellingPrice = '57'
    product.details.price.costPrice = '51,11'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Groupe de sécurité'
    product.details.description = 'Groupe de sécurité'
    product.details.price.sellingPrice = '19,23'
    product.details.price.costPrice = '11,85'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur thermostatique pour chauffe eau électrique'
    product.details.description = 'Mitigeur thermostatique pour chauffe eau électrique'
    product.details.price.sellingPrice = '96,5'
    product.details.price.costPrice = '85,53'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réducteur de pression pour appareil isolé'
    product.details.description = 'Réducteur de pression pour appareil isolé'
    product.details.price.sellingPrice = '35'
    product.details.price.costPrice = '24,75'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Brasure'
    product.details.description = 'Brasure'
    product.details.price.sellingPrice = '3,5'
    product.details.price.costPrice = '2,85'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 12'
    product.details.description = 'Raccord cuivre ø 12'
    product.details.price.sellingPrice = '2'
    product.details.price.costPrice = '1,41'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 14'
    product.details.description = 'Raccord cuivre ø 14'
    product.details.price.sellingPrice = '2,5'
    product.details.price.costPrice = '1,83'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 16'
    product.details.description = 'Raccord cuivre ø 16'
    product.details.price.sellingPrice = '2,75'
    product.details.price.costPrice = '1,83'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 18'
    product.details.description = 'Raccord cuivre ø 18'
    product.details.price.sellingPrice = '3'
    product.details.price.costPrice = '1,94'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 22'
    product.details.description = 'Raccord cuivre ø 22'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,3'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 28'
    product.details.description = 'Raccord cuivre ø 28'
    product.details.price.sellingPrice = '5,5'
    product.details.price.costPrice = '4'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 32'
    product.details.description = 'Raccord cuivre ø 32'
    product.details.price.sellingPrice = '6'
    product.details.price.costPrice = '5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord cuivre ø 40'
    product.details.description = 'Raccord cuivre ø 40'
    product.details.price.sellingPrice = '7,5'
    product.details.price.costPrice = '5,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Jonction PVC/Cuivre ø40'
    product.details.description = 'Jonction PVC/Cuivre ø40'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = '13'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Jonction PVC/Cuivre ø32'
    product.details.description = 'Jonction PVC/Cuivre ø32'
    product.details.price.sellingPrice = '11'
    product.details.price.costPrice = '10,51'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 12'
    product.details.description = 'Tube cuivre ø 12'
    product.details.price.sellingPrice = '7'
    product.details.price.costPrice = '2,84'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 14'
    product.details.description = 'Tube cuivre ø 14'
    product.details.price.sellingPrice = '8,1'
    product.details.price.costPrice = '4,05'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 16'
    product.details.description = 'Tube cuivre ø 16'
    product.details.price.sellingPrice = '9,2'
    product.details.price.costPrice = '4,68'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 18'
    product.details.description = 'Tube cuivre ø 18'
    product.details.price.sellingPrice = '10,5'
    product.details.price.costPrice = '5,31'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 22'
    product.details.description = 'Tube cuivre ø 22'
    product.details.price.sellingPrice = '12,8'
    product.details.price.costPrice = '6,57'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 28'
    product.details.description = 'Tube cuivre ø 28'
    product.details.price.sellingPrice = '16,6'
    product.details.price.costPrice = '8,46'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 32'
    product.details.description = 'Tube cuivre ø 32'
    product.details.price.sellingPrice = '19,3'
    product.details.price.costPrice = '9,87'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube cuivre ø 40'
    product.details.description = 'Tube cuivre ø 40'
    product.details.price.sellingPrice = '25,1'
    product.details.price.costPrice = '12,44'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Manomètre à bain de glycérine'
    product.details.description = 'Manomètre à bain de glycérine'
    product.details.price.sellingPrice = '17,05'
    product.details.price.costPrice = '9,77'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Joint Fibre'
    product.details.description = 'Joint Fibre'
    product.details.price.sellingPrice = '0,5'
    product.details.price.costPrice = '0,05'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord tectite '
    product.details.description = 'Raccord tectite '
    product.details.price.sellingPrice = '14,5'
    product.details.price.costPrice = '8,96'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Applique pour robinet de machine à laver'
    product.details.description = 'Applique pour robinet de machine à laver'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,13'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réducteur de pression 3 bar'
    product.details.description = 'Réducteur de pression 3 bar'
    product.details.price.sellingPrice = '90'
    product.details.price.costPrice = '56,7'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet d\'arrosage'
    product.details.description = 'Robinet d\'arrosage'
    product.details.price.sellingPrice = '11'
    product.details.price.costPrice = '6,93'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet de machine à laver'
    product.details.description = 'Robinet de machine à laver'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,3'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Collier et patte à vis'
    product.details.description = 'Collier et patte à vis'
    product.details.price.sellingPrice = '2,9'
    product.details.price.costPrice = '2,18'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Clapet anti retour laiton'
    product.details.description = 'Clapet anti retour laiton'
    product.details.price.sellingPrice = '14'
    product.details.price.costPrice = '9,82'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 12'
    product.details.description = 'Raccord laiton à souder 12'
    product.details.price.sellingPrice = '2,5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 14'
    product.details.description = 'Raccord laiton à souder 14'
    product.details.price.sellingPrice = '3'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 16'
    product.details.description = 'Raccord laiton à souder 16'
    product.details.price.sellingPrice = '3,25'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 18'
    product.details.description = 'Raccord laiton à souder 18'
    product.details.price.sellingPrice = '3,5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 22'
    product.details.description = 'Raccord laiton à souder 22'
    product.details.price.sellingPrice = '3,75'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 28'
    product.details.description = 'Raccord laiton à souder 28'
    product.details.price.sellingPrice = '4'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 32'
    product.details.description = 'Raccord laiton à souder 32'
    product.details.price.sellingPrice = '6'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à souder 40'
    product.details.description = 'Raccord laiton à souder 40'
    product.details.price.sellingPrice = '12'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 12'
    product.details.description = 'Raccord laiton 3Pièces à souder 12'
    product.details.price.sellingPrice = '3,5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 14'
    product.details.description = 'Raccord laiton 3Pièces à souder 14'
    product.details.price.sellingPrice = '3,75'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 16'
    product.details.description = 'Raccord laiton 3Pièces à souder 16'
    product.details.price.sellingPrice = '4'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 18'
    product.details.description = 'Raccord laiton 3Pièces à souder 18'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 22'
    product.details.description = 'Raccord laiton 3Pièces à souder 22'
    product.details.price.sellingPrice = '6'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces  à souder 28'
    product.details.description = 'Raccord laiton 3Pièces  à souder 28'
    product.details.price.sellingPrice = '10'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 32'
    product.details.description = 'Raccord laiton 3Pièces à souder 32'
    product.details.price.sellingPrice = '16'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton 3Pièces à souder 40'
    product.details.description = 'Raccord laiton 3Pièces à souder 40'
    product.details.price.sellingPrice = '22,5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 12/17'
    product.details.description = 'Raccord laiton à visser 12/17'
    product.details.price.sellingPrice = '3'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 15/21'
    product.details.description = 'Raccord laiton à visser 15/21'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 20/27'
    product.details.description = 'Raccord laiton à visser 20/27'
    product.details.price.sellingPrice = '7'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 26/34'
    product.details.description = 'Raccord laiton à visser 26/34'
    product.details.price.sellingPrice = '9'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 33/42'
    product.details.description = 'Raccord laiton à visser 33/42'
    product.details.price.sellingPrice = '12'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord laiton à visser 40/49'
    product.details.description = 'Raccord laiton à visser 40/49'
    product.details.price.sellingPrice = '14'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord multicouche à sertir ø 16'
    product.details.description = 'Raccord multicouche à sertir ø 16'
    product.details.price.sellingPrice = '11'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord multicouche à sertir ø 20'
    product.details.description = 'Raccord multicouche à sertir ø 20'
    product.details.price.sellingPrice = '13'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord multicouche à sertir ø 26'
    product.details.description = 'Raccord multicouche à sertir ø 26'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord multicouche à sertir ø 32'
    product.details.description = 'Raccord multicouche à sertir ø 32'
    product.details.price.sellingPrice = '26'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube multicouche à sertir ø 16'
    product.details.description = 'Tube multicouche à sertir ø 16'
    product.details.price.sellingPrice = '3'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube multicouche à sertir ø 20'
    product.details.description = 'Tube multicouche à sertir ø 20'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube multicouche à sertir ø 26'
    product.details.description = 'Tube multicouche à sertir ø 26'
    product.details.price.sellingPrice = '8'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube multicouche à sertir ø 32'
    product.details.description = 'Tube multicouche à sertir ø 32'
    product.details.price.sellingPrice = '12'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PE 25'
    product.details.description = 'Raccord PE 25'
    product.details.price.sellingPrice = '20'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PE 27'
    product.details.description = 'Raccord PE 27'
    product.details.price.sellingPrice = '23'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PE 32'
    product.details.description = 'Raccord PE 32'
    product.details.price.sellingPrice = '25'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube Polyèthylène Bleu 16B'
    product.details.description = 'Tube Polyèthylène Bleu 16B'
    product.details.price.sellingPrice = '3,56'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube Polyèthylène Bleu 12.5B '
    product.details.description = 'Tube Polyèthylène Bleu 12.5B '
    product.details.price.sellingPrice = '4,02'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PER ø 12'
    product.details.description = 'Raccord PER ø 12'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PER ø 16'
    product.details.description = 'Raccord PER ø 16'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Raccord PER ø 20'
    product.details.description = 'Raccord PER ø 20'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PER ø 12'
    product.details.description = 'Tube PER ø 12'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PER ø 16'
    product.details.description = 'Tube PER ø 16'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PER ø 20'
    product.details.description = 'Tube PER ø 20'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC 100/40/40'
    product.details.description = 'Réduction PVC 100/40/40'
    product.details.price.sellingPrice = '5,69'
    product.details.price.costPrice = '3,89'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC 100/32'
    product.details.description = 'Réduction PVC 100/32'
    product.details.price.sellingPrice = '5,79'
    product.details.price.costPrice = '3,96'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC 100/40'
    product.details.description = 'Réduction PVC 100/40'
    product.details.price.sellingPrice = '5,83'
    product.details.price.costPrice = '2,64'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC 100/50'
    product.details.description = 'Réduction PVC 100/50'
    product.details.price.sellingPrice = ''
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Aérateur à membrane 110/100'
    product.details.description = 'Aérateur à membrane 110/100'
    product.details.price.sellingPrice = '42,2'
    product.details.price.costPrice = '28,16'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Bouchon PVC ø 100'
    product.details.description = 'Bouchon PVC ø 100'
    product.details.price.sellingPrice = '7,06'
    product.details.price.costPrice = '3,39'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude PVC100 30°'
    product.details.description = 'Coude PVC100 30°'
    product.details.price.sellingPrice = '10,64'
    product.details.price.costPrice = '5,66'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude PVC 100 45° '
    product.details.description = 'Coude PVC 100 45° '
    product.details.price.sellingPrice = '8,33'
    product.details.price.costPrice = '2,91'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude PVC 100 90° '
    product.details.description = 'Coude PVC 100 90° '
    product.details.price.sellingPrice = '8,59'
    product.details.price.costPrice = '3,33'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Collier PVC ø100'
    product.details.description = 'Collier PVC ø100'
    product.details.price.sellingPrice = '3,51'
    product.details.price.costPrice = '2,22'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Manchon PVC ø100'
    product.details.description = 'Manchon PVC ø100'
    product.details.price.sellingPrice = '3,55'
    product.details.price.costPrice = '1,49'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Manchon à coulisse PVC ø100'
    product.details.description = 'Manchon à coulisse PVC ø100'
    product.details.price.sellingPrice = '4,78'
    product.details.price.costPrice = '4,47'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Té PVC ø100 '
    product.details.description = 'Té PVC ø100 '
    product.details.price.sellingPrice = '12,39'
    product.details.price.costPrice = '5,93'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Y PVC ø100'
    product.details.description = 'Y PVC ø100'
    product.details.price.sellingPrice = '12,78'
    product.details.price.costPrice = '5,69'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Aérateur à membrane ø32-40-50'
    product.details.description = 'Aérateur à membrane ø32-40-50'
    product.details.price.sellingPrice = '16,31'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC 93/40/40'
    product.details.description = 'Réduction PVC 93/40/40'
    product.details.price.sellingPrice = '6,16'
    product.details.price.costPrice = '5,76'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Lot Machine à laver'
    product.details.description = 'Lot Machine à laver'
    product.details.price.sellingPrice = '12'
    product.details.price.costPrice = '6,51'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Reduction PVC 40/32'
    product.details.description = 'Reduction PVC 40/32'
    product.details.price.sellingPrice = '1,27'
    product.details.price.costPrice = '0,44'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Bouchon PVC ø32-40-50'
    product.details.description = 'Bouchon PVC ø32-40-50'
    product.details.price.sellingPrice = '1,56'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC ø50/32'
    product.details.description = 'Réduction PVC ø50/32'
    product.details.price.sellingPrice = '1,48'
    product.details.price.costPrice = '0,78'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réduction PVC ø50/40'
    product.details.description = 'Réduction PVC ø50/40'
    product.details.price.sellingPrice = '1,36'
    product.details.price.costPrice = '1,29'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude à 45° PVC ø32-40-50 '
    product.details.description = 'Coude à 45° PVC ø32-40-50 '
    product.details.price.sellingPrice = '2,78'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Coude à 90° PVC ø32-40-50'
    product.details.description = 'Coude à 90° PVC ø32-40-50'
    product.details.price.sellingPrice = '3,38'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Collier PVC ø32-40-50'
    product.details.description = 'Collier PVC ø32-40-50'
    product.details.price.sellingPrice = '1,32'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Manchon PVC ø32-40-50'
    product.details.description = 'Manchon PVC ø32-40-50'
    product.details.price.sellingPrice = '1,73'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Manchon de dilatation en PVC ø 32-40-50'
    product.details.description = 'Manchon de dilatation en PVC ø 32-40-50'
    product.details.price.sellingPrice = '8,36'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Té PVC ø32-40-50'
    product.details.description = 'Té PVC ø32-40-50'
    product.details.price.sellingPrice = '6,68'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Culotte 90° PVC ø32-40-50'
    product.details.description = 'Culotte 90° PVC ø32-40-50'
    product.details.price.sellingPrice = '6,68'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PVC ø100'
    product.details.description = 'Tube PVC ø100'
    product.details.price.sellingPrice = '3,38'
    product.details.price.costPrice = '2,19'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PVC ø32'
    product.details.description = 'Tube PVC ø32'
    product.details.price.sellingPrice = '1,77'
    product.details.price.costPrice = '0,95'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PVC ø40'
    product.details.description = 'Tube PVC ø40'
    product.details.price.sellingPrice = '1,96'
    product.details.price.costPrice = '1,11'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tube PVC ø50'
    product.details.description = 'Tube PVC ø50'
    product.details.price.sellingPrice = '2,48'
    product.details.price.costPrice = '1,4'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tête de robinet à potence'
    product.details.description = 'Tête de robinet à potence'
    product.details.price.sellingPrice = '8'
    product.details.price.costPrice = '3,08'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vanne de vidange à boisseau 12-15-20'
    product.details.description = 'Vanne de vidange à boisseau 12-15-20'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vanne de vidange à boisseau 26-33-40'
    product.details.description = 'Vanne de vidange à boisseau 26-33-40'
    product.details.price.sellingPrice = '32'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vanne ordinaire à boisseau 12-15-20'
    product.details.description = 'Vanne ordinaire à boisseau 12-15-20'
    product.details.price.sellingPrice = '10'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vanne ordinaire à boisseau 26-33-40'
    product.details.description = 'Vanne ordinaire à boisseau 26-33-40'
    product.details.price.sellingPrice = '28,5'
    product.details.price.costPrice = ''
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Lavabo blanc 50*60'
    product.details.description = 'Lavabo blanc 50*60'
    product.details.price.sellingPrice = '85'
    product.details.price.costPrice = '38,85'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Colonne de lavabo '
    product.details.description = 'Colonne de lavabo '
    product.details.price.sellingPrice = '50'
    product.details.price.costPrice = '23,37'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Douchette'
    product.details.description = 'Douchette'
    product.details.price.sellingPrice = '32,24'
    product.details.price.costPrice = '7,94'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible sanitaire 1m00'
    product.details.description = 'Flexible sanitaire 1m00'
    product.details.price.sellingPrice = '20,54'
    product.details.price.costPrice = '19,2'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible sanitaire 30cm'
    product.details.description = 'Flexible sanitaire 30cm'
    product.details.price.sellingPrice = '6,5'
    product.details.price.costPrice = '4,28'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible sanitaire 50 cm'
    product.details.description = 'Flexible sanitaire 50 cm'
    product.details.price.sellingPrice = '11,5'
    product.details.price.costPrice = '9,29'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Siphon d\'évier'
    product.details.description = 'Siphon d\'évier'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,96'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Siphon de lavabo'
    product.details.description = 'Siphon de lavabo'
    product.details.price.sellingPrice = '5'
    product.details.price.costPrice = '2,49'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Tête de robinet universelle pour mélangeur'
    product.details.description = 'Tête de robinet universelle pour mélangeur'
    product.details.price.sellingPrice = '17,68'
    product.details.price.costPrice = '16,76'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vidage d\'évier pour 2 cuves'
    product.details.description = 'Vidage d\'évier pour 2 cuves'
    product.details.price.sellingPrice = '61,39'
    product.details.price.costPrice = '35,88'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vidage de baignoire à câble'
    product.details.description = 'Vidage de baignoire à câble'
    product.details.price.sellingPrice = '34,6'
    product.details.price.costPrice = '28,01'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Vidage d\'évier 2 cuves à cable'
    product.details.description = 'Vidage d\'évier 2 cuves à cable'
    product.details.price.sellingPrice = '98'
    product.details.price.costPrice = '85,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Pack WC surélevé Odéon'
    product.details.description = 'Pack WC surélevé Odéon'
    product.details.price.sellingPrice = '415'
    product.details.price.costPrice = '314,06'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Barre de relèvement coudée '
    product.details.description = 'Barre de relèvement coudée '
    product.details.price.sellingPrice = '135'
    product.details.price.costPrice = '47,1'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Barre de relèvement droite'
    product.details.description = 'Barre de relèvement droite'
    product.details.price.sellingPrice = '58'
    product.details.price.costPrice = '55,1'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Bec d\'évier universel col de cygne'
    product.details.description = 'Bec d\'évier universel col de cygne'
    product.details.price.sellingPrice = '27,5'
    product.details.price.costPrice = '23,97'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Bec d\'évier horizontal'
    product.details.description = 'Bec d\'évier horizontal'
    product.details.price.sellingPrice = '20,65'
    product.details.price.costPrice = '19,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible de douche 1,50m'
    product.details.description = 'Flexible de douche 1,50m'
    product.details.price.sellingPrice = '12'
    product.details.price.costPrice = '6,33'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible de douche  1,75m'
    product.details.description = 'Flexible de douche  1,75m'
    product.details.price.sellingPrice = '15'
    product.details.price.costPrice = '6,87'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Flexible de douche  2,00m'
    product.details.description = 'Flexible de douche  2,00m'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = '7,17'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur Bain Douche mécanique monotrou'
    product.details.description = 'Mitigeur Bain Douche mécanique monotrou'
    product.details.price.sellingPrice = '109'
    product.details.price.costPrice = '64,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur d\'évier bec fondu'
    product.details.description = 'Mitigeur d\'évier bec fondu'
    product.details.price.sellingPrice = '140'
    product.details.price.costPrice = '88,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur d\'évier bec tube'
    product.details.description = 'Mitigeur d\'évier bec tube'
    product.details.price.sellingPrice = '89'
    product.details.price.costPrice = '55,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur d\'évier mural'
    product.details.description = 'Mitigeur d\'évier mural'
    product.details.price.sellingPrice = '144'
    product.details.price.costPrice = '113,22'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur de lavabo'
    product.details.description = 'Mitigeur de lavabo'
    product.details.price.sellingPrice = '125'
    product.details.price.costPrice = '112,5'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur de douche mécanique'
    product.details.description = 'Mitigeur de douche mécanique'
    product.details.price.sellingPrice = '110'
    product.details.price.costPrice = '103,39'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mitigeur de douche thermostatique'
    product.details.description = 'Mitigeur de douche thermostatique'
    product.details.price.sellingPrice = '196'
    product.details.price.costPrice = '186,19'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Abattant de WC à descente progressive '
    product.details.description = 'Abattant de WC à descente progressive '
    product.details.price.sellingPrice = '68,99'
    product.details.price.costPrice = '61,43'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Abattant de WC'
    product.details.description = 'Abattant de WC'
    product.details.price.sellingPrice = '45'
    product.details.price.costPrice = '35'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Fixation pour abattant'
    product.details.description = 'Fixation pour abattant'
    product.details.price.sellingPrice = '18'
    product.details.price.costPrice = '9,58'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Fixation de WC au sol'
    product.details.description = 'Fixation de WC au sol'
    product.details.price.sellingPrice = '7,5'
    product.details.price.costPrice = '7,01'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Joint mousse pour mécanisme WC'
    product.details.description = 'Joint mousse pour mécanisme WC'
    product.details.price.sellingPrice = '3,56'
    product.details.price.costPrice = '1,43'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Joint de soupape pour mécanisme WC'
    product.details.description = 'Joint de soupape pour mécanisme WC'
    product.details.price.sellingPrice = '3,72'
    product.details.price.costPrice = '1,59'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Mecanisme de chasse à tirette'
    product.details.description = 'Mecanisme de chasse à tirette'
    product.details.price.sellingPrice = '22,5'
    product.details.price.costPrice = '15,24'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Pack wc EOLIA blanc - Jacob De'
    product.details.description = 'Pack wc EOLIA blanc - Jacob De'
    product.details.price.sellingPrice = '148'
    product.details.price.costPrice = '98,43'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Pipe Longue ø93'
    product.details.description = 'Pipe Longue ø93'
    product.details.price.sellingPrice = '21,44'
    product.details.price.costPrice = '16,88'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Pipe  ø100  avec event ø40'
    product.details.description = 'Pipe  ø100  avec event ø40'
    product.details.price.sellingPrice = '20,38'
    product.details.price.costPrice = '20,55'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Réservoir RONDO double volume '
    product.details.description = 'Réservoir RONDO double volume '
    product.details.price.sellingPrice = '58'
    product.details.price.costPrice = '56,42'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet flotteur'
    product.details.description = 'Robinet flotteur'
    product.details.price.sellingPrice = '20'
    product.details.price.costPrice = '9,63'
    product.details.unit = 'Q'
    product.save()
    product = new Product()
    product.ownerCompanies = companie._id
    product.owner = user._id
    product.details.referenceName = 'Robinet de chasse '
    product.details.description = 'Robinet de chasse '
    product.details.price.sellingPrice = '6,5'
    product.details.price.costPrice = '6,23'
    product.details.unit = 'Q'
    product.save()


  },



}
