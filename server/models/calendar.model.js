var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var calendar = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    events:[{
      title:{type: String, default: ['']},
      url:{type: String, default: ['']},
      start:{type: Date},
      end:{type: Date},
      id:{type: Number},
      client: [{type: Schema.Types.ObjectId, ref: 'User'}],
    }],
  },
  {
    timestamps: true
  })

calendar.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Calendar', calendar)
