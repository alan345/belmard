var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var paiementQuote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],
    datePaiement: {type: Date},
    amount: {type: Number},
    type: {type: String},
  },
  {
    timestamps: true
  })

paiementQuote.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('PaiementQuote', paiementQuote)
