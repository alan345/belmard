var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var options = new Schema({
    design: {
      mainPage : {

        buttonHomePage:{type: String, default: ['']},
        titleHomePage:{type: String, default: ['']},
        linkButtonHomePage:{type: String, default: ['']},
        _imgHome1:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgHome2:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgHome3:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgHome4:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgHome5:[{type: Schema.Types.ObjectId, ref: 'Form'}],
        _imgHome6:[{type: Schema.Types.ObjectId, ref: 'Form'}],
      }
    },
  },
  {
    timestamps: true
  }
);

options.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Options', options);
