var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),

    mongooseUniqueValidator = require('mongoose-unique-validator')

var user = new Schema({
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    products: [{
      dateProductAdded: {type: Date, default: ['']},
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
    }],
    notes: [{
      text: String,
      dateNote: Date
    }],
    resetPasswordToken: String,
    resetPasswordExpires: String,
    trackinPage : {
      lastVisitPageVideo: {type: Date, default: ['']},
      lastVisitPagePress: {type: Date, default: ['']}
    },
    lastVisit: Date,
    // you might want more user roles, so an array would be fine
    role: {type: Array, default: ['client']},
    profile : {
      _profilePicture : [{type: Schema.Types.ObjectId, ref: 'Form'}],
      parentUser: [{type: Schema.Types.ObjectId, ref: 'User'}],
      name: {type: String, default: ['']},
      isFeatured: {type: Boolean, default: ['false']},
      title: {type: String, default: ['']},
      lastName: {type: String, default: ['']},
      phoneNumber:{type: String, default: ['']},
      hair : {
        hairCondition : {type: String, default: ['Normal']},
        scalpCondition : {type: String, default: ['Healthy']},
        hairTexture : {type: String, default: ['Fine']}
      }
    }
  },
  {
    timestamps: true
  })

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);
