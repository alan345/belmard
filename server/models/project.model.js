var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
  //  Form                    = require('../models/form.model'),
  //  User                    = require('../models/user.model'),
  //  Quote                    = require('../models/quote.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator')


var project = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    details: {
      name: {type: String},
      description: {type: String},
    },
    clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status: {type: String, default: [0]},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    status: {type: Number},
    categorie: {
      categ1:[{name: {type: String}}],
      categ2:[{name: {type: String}}],
      categ3:[{name: {type: String}}],
    },
    bucketTasks:[{
      bucketName:{type: String, default: ['']},
      tasks:[{
        name: {type: String},
        description: {type: String},
        assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
      }]
    }]
  },
  {
    timestamps: true
  })

project.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Project', project)
