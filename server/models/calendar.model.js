var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var calendar = new Schema(

    {
      title:{type: String, default: ['']},
      color: {
        primary: {type: String, default: ['#ad2121']},
        secondary: {type: String, default: ['#FAE3E3']},
      },
      resizable: {
        beforeStart: {type: Boolean, default: [true]},
        afterEnd: {type: Boolean, default: [true]},
      },
      draggable: {type: Boolean, default: [true]},

      //url:{type: String, default: ['']},
      start:{type: Date},
      end:{type: Date},
      meta: {
        client: [{type: Schema.Types.ObjectId, ref: 'User'}],
        user: [{type: Schema.Types.ObjectId, ref: 'User'}],
      }

  },
  {
    timestamps: true
  })

calendar.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Calendar', calendar)
