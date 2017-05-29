var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var promotion = new Schema({
    name: {type: String},
    date : {
      dateBegin: {type: Date, default: ['']},
      dateEnd: {type: Date, default: ['']},
    },
    owner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    form: [{type: Schema.Types.ObjectId, ref: 'Form'}],

  },
  {
    timestamps: true
  });

promotion.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Promotion', promotion);
