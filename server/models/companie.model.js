var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var companie = new Schema({
  //  _id: String,
    address: {
      address : {type: String, default: ['']},
      city : {type: String, default: ['']},
      state : {type: String, default: ['']},
      zip : {type: String, default: ['']},
    },
    phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    typeCompanie: {type: String, default: ['salon']},
    //users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],


  },
  {
    timestamps: true
  });

companie.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Companie', companie);
