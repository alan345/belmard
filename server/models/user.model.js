var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    Form                    = require('../models/form.model'),

    mongooseUniqueValidator = require('mongoose-unique-validator')

var user = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    createdByUser: [{type: Schema.Types.ObjectId, ref: 'User'}],
    canBeSeenByCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // companies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    isAdminOfHisCompanie: {type: Boolean, default: false},
    isExternalUser:{type: Boolean, default: false},
    dateSeeLatestNotif: {type: Date, default: [Date()]},
    email: {type: String, unique: true, required: true, lowercase: true},
    password: {type: String, required: true},
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    // paiement: {
    //   stripe:[{
    //     companies:[{type: Schema.Types.ObjectId, ref: 'Companie'}],
    //     cusId:{type: String, default: ['']},
    //     planDetail:{
    //       plan:{type: String, default: ['']},
    //       current_period_end: {type: Date, default: [Date()]},
    //     }
    //   }]
    // },
    // salesMan: [{type: Schema.Types.ObjectId, ref: 'User'}],
    resetPasswordToken: String,
    resetPasswordExpires: String,
    // role: {type: String, default: ['user']},
    isAdmin: {type: Boolean, default: false},
    rights: [{type: Schema.Types.ObjectId, ref: 'Right'}],
    rightsInApp: [],
    typeUsers: {type: Array},
    profile : {
      profilePicture : [{type: Schema.Types.ObjectId, ref: 'Form'}],
      language: {type: String, default: ['fr']},
      name: {type: String, default: ['']},
      // sourceContact: {type: String, default: ['']},
      companyName: {type: String, default: ['']},



      lastName: {type: String, default: ['']},
      phoneNumber: {type: String, default: ['']},
      otherData: {type: String, default: ['']},
      typeMaison: {type: String, default: ['']},
      accessType: {type: String, default: ['']},
      source: {type: String, default: ['']},
      etage: {type: String, default: ['']},
      codeentree: {type: String, default: ['']},
      surface: {type: String, default: ['']},
      typeEscalier: {type: String, default: ['']},



      // fax:{type: String, default: ['']},
      title: {type: String, default: ['']},
      lastName: {type: String, default: ['']},
      typeClient:{type: String, default: ['']},
      colorCalendar:{type: String, default: ['#ad2121']},
      address:[{
        nameAddress:  {type: String, default: ['']},
        address : {type: String, default: ['']},
        address2 : {type: String, default: ['']},
        city : {type: String, default: ['']},
        state : {type: String, default: ['']},
        zip : {type: String, default: ['']},
        country : {type: String, default: ['']},
      }],


      // statusHouse:{type: String, default: ['']},
      otherData:{type: String, default: ['']},
      // detailHouse:{
      //   typeHouse:{type: String, default: ['']},
      //   surface:{type: Number, default: 0},
      //   accesCode:{type: String, default: ['']},
      //   floor:{type: String, default: ['']},
      //   accessType:{type: String, default: ['']},
      // },
      // address:[{
      //   nameAddress:  {type: String, default: ['']},
      //   address : {type: String, default: ['']},
      //   address2 : {type: String, default: ['']},
      //   city : {type: String, default: ['']},
      //   state : {type: String, default: ['']},
      //   zip : {type: String, default: ['']},
      //   country : {type: String, default: ['']},
      // }],
    }
  },
  {
    timestamps: true
  })

user.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', user);
