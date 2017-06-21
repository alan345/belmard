var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    //Product                    = require('../models/product.model'),
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var quote = new Schema({
  //  _id: String,
    address:{
      address : {type: String, default: ['']},
      city : {type: String, default: ['']},
      state : {type: String, default: ['']},
      zip : {type: String, default: ['']},
    },
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    typeQuote: {type: String, default: ['salon']},
    _users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    devisDetails: [{
      productInit: {
        _id:{type: String},
        details: {
          referenceName: {type: String},
          reference: {type: String},
          price: {
            costPrice: {type: Number},
            sellingPrice: { type: Number},
          },
          description: {type: String},
          dimension: {
            height: {type: Number},
            width: {type: Number},
            depth: {type: Number},
          }
        }
      },

      priceWithoutTaxes: {type: Number},
      priceWithTaxes: {type: Number},
      totalPriceWithoutTaxes: {type: Number},
      totalPriceWithTaxes: {type: Number},
      vat: {type: Number},
      quantity: {type: Number},
      discount: {type: Number},
    }],
    priceQuote: {
      priceQuoteWithoutTaxes: {type: Number, default: [0]},
      priceQuoteWithTaxes: {type: Number, default: [0]},
    }

  },
  {
    timestamps: true
  });

quote.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Quote', quote);
