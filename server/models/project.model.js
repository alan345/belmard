var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var project = new Schema({
    name: {type: String},
    description: {type: String},
    client: [{type: Schema.Types.ObjectId, ref: 'User'}],
    assignedTo: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status: {type: String},
  },
  {
    timestamps: true
  })

project.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Project', project)
