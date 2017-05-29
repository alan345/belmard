var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var productBatch = new Schema({


    dateBegin :  Date,
    dateEnd: Date,
    status: {type: String,  default: ['']},
    total_count : {type: Number,  default: ['']},
    total_item_treated : {type: Number,  default: ['']},
    nbProductsCreated : {type: Number,  default: ['']},
    nbProductsUpdated : {type: Number,  default: ['']},
    nbProductsNotCreated : {type: Number,  default: ['']},
    nbProductsNotUpdated : {type: Number,  default: ['']},

  },
  {
    timestamps: true
  });

productBatch.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('ProductBatch', productBatch);
