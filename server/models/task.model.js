var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator')


var task = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    bucketTasks:[{
      bucketName:{type: String, default: ['']},
      taskDetails:[{
        name: {type: String},
        description: {type: String},
        assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
      }]
    }]
  },
  {
    timestamps: true
  })

task.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('Task', task)
