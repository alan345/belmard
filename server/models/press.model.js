var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')

var press = new Schema({
    title: {type: String},
    link: {type: String},
    formPDF: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    form: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    timestamps: true
  })

press.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Press', press)
