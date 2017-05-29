var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var product = new Schema({

    categories: [{name: {type: String}, type:{type: String}}],
    relatedProducts: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    description: {
      benefitsAndResults :{type: String,  default: ['']},
      howToApply:{type: String,  default: ['']},
      activeIngredients:{type: String,  default: ['']},
      title: {
        prononciation : {type: String,  default: ['']},
        embed: {type: String, default: ['']},
      }
    },
    magento: {
      id: {type: String, unique: true, required: true},
      sku: {type: String, unique: true, required: true},
      name: {type: String},
      price: {type: Number},
      weight:{type: String},
      custom_attributes:[{
        attribute_code : {type: String},
        value : {type: String},
      }]
    }
  },
  {
    timestamps: true
  });

product.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Product', product);
