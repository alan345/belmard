var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var userCalendar = new Schema({
      ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
      title:{type: String, default: ['']},
      url:{type: String, default: ['']},
      start:{type: Date},
      end:{type: Date},
      draggable: {type: Boolean, default: [true] },
      clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
      projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
      users: [{type: Schema.Types.ObjectId, ref: 'User'}],
      color: {
        primary: {type: String, default: ['#ad2121']},
        secondary: {type: String, default: ['#FAE3E3']},
      },
      resizable:{
        beforeStart:  {type: Boolean, default: [true] },
        afterEnd:  {type: Boolean, default: [true] },
      }

  },
  {
    timestamps: true
  })

userCalendar.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('UserCalendar', userCalendar)
