var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var userCalendar = new Schema({
      title:{type: String, default: ['']},
      url:{type: String, default: ['']},
      start:{type: Date},
      end:{type: Date},
      client: [{type: Schema.Types.ObjectId, ref: 'User'}],
      user: [{type: Schema.Types.ObjectId, ref: 'User'}],
      color: {
        primary: {type: String, default: ['#ad2121']},
        secondary: {type: String, default: ['#FAE3E3']},
      }

  },
  {
    timestamps: true
  })

userCalendar.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('UserCalendar', userCalendar)
