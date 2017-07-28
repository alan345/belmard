var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator')


var task = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],

    name: {type: String},
    status: {type: String},
    description: {type: String},
    assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dateTask:{
      creationDate: {type: Date, default: [Date()]},
      endDate: {type: Date, default: [Date()]},
    }

  },
  {
    timestamps: true
  })

task.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Task', task)
