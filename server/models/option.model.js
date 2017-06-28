var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var options = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    calendar: {
      timeBegin: {type: Number},
    }
  },
  {
    timestamps: true
  }
);

options.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Options', options);
