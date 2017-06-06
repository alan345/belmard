var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')

var product = new Schema({
    title: {type: String},
    embed: {type: String},
    categories: [{name: {type: String}, type:{type: String}}],
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
  {
    timestamps: true
  })

product.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Product', product)
