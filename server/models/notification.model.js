var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var notification = new Schema({
  //  _id: String,
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],

    detailNotification: {
        nameNotification: {type: String, default: ['']},
        permissions:[{
          namePermission: {type: String, default: ['']},
          access:[{
              typeAccess: {type: String, default: ['']},
            }]
          }]
      }

  },
  {
    timestamps: true
  });

notification.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Notification', notification);
