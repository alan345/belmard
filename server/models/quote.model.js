var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
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
    phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    typeQuote: {type: String, default: ['salon']},
    _users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],


  },
  {
    timestamps: true
  });

quote.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Quote', quote);
