var mongoose                = require('mongoose'),
    Schema                  = mongoose.Schema,
    //Product                    = require('../models/product.model'),
  //  Form                    = require('../models/form.model'),
    User                    = require('../models/user.model'),
    mongooseUniqueValidator = require('mongoose-unique-validator');

var quote = new Schema({
    ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
    parentQuotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}],

    // ownerQuotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
    assignedTos: [{type: Schema.Types.ObjectId, ref: 'User'}],
    historyClients: [{
      // ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
      // canBeSeenByCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
      // companies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
      // isAdminOfHisCompanie:{type: Boolean, default: false},
      // isExternalUser:{type: Boolean, default: false},
      // dateSeeLatestNotif: {type: Date, default: [Date()]},
      email: {type: String},
      // password: {type: String, required: true},
      // forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
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
      // resetPasswordToken: String,
      // resetPasswordExpires: String,
      // role: {type: Array, default: ['client']},
      // rights: [{type: Schema.Types.ObjectId, ref: 'Right'}],
      // rightsInApp: [],
      // typeUsers: {type: Array},
      profile : {
        // profilePicture : [{type: Schema.Types.ObjectId, ref: 'Form'}],
        language: {type: String, default: ['fr']},
        name: {type: String, default: ['']},
        // sourceContact: {type: String, default: ['']},
        companyName: {type: String, default: ['']},
        // fax:{type: String, default: ['']},
        title: {type: String, default: ['']},
        lastName: {type: String, default: ['']},
        phoneNumber:{type: String, default: ['']},
        typeClient:{type: String, default: ['']},
        // colorCalendar:{type: String, default: ['#ad2121']},
        // statusHouse:{type: String, default: ['']},
        // otherData:{type: String, default: ['']},

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
    }],
    historyClientsCross: [{
      // ownerCompanies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],

      // companies: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
      // isAdminOfHisCompanie:{type: Boolean, default: false},

      // users: [{type: Schema.Types.ObjectId, ref: 'User'}],
      // forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],

      // role: {type: Array, default: ['client']},

      // rightsInApp: [],
      // typeUsers: {type: Array},
      profile : {
        profilePicture : [{type: Schema.Types.ObjectId, ref: 'Form'}],
        language: {type: String, default: ['fr']},
        name: {type: String, default: ['']},
        // sourceContact: {type: String, default: ['']},
        companyName: {type: String, default: ['']},
        // fax:{type: String, default: ['']},
        title: {type: String, default: ['']},
        lastName: {type: String, default: ['']},
        phoneNumber:{type: String, default: ['']},
        // typeClient:{type: String, default: ['']},
        // colorCalendar:{type: String, default: ['#ad2121']},
        // statusHouse:{type: String, default: ['']},
        otherData:{type: String, default: ['']},

        address:[{
          nameAddress:  {type: String, default: ['']},
          address : {type: String, default: ['']},
          address2 : {type: String, default: ['']},
          city : {type: String, default: ['']},
          state : {type: String, default: ['']},
          zip : {type: String, default: ['']},
          country : {type: String, default: ['']},
        }],
      }
    }],
    legalApprovals: [{type: String, default: ['']}],
    typeIntervention: {type: String, default: ['']},
    // companieClients: [{type: Schema.Types.ObjectId, ref: 'Companie'}],
    // phoneNumber: {type: String, default: ['']},
    name: {type: String, default: ['']},
    quoteNumber: {type: Number, default: 0},
    statusQuote: {type: String, default: ['']},
    detail: {
      currency: {type: String, default: ['']},
      quoteRef: {type: String, default: ['']},
      dateQuote: {
        issueDate: {type: Date, default: [Date()]},
        expiryDate: {type: Date, default: [Date()]},
        dateInvoicePaid: {type: Date, default: [Date()]},
      }
    },
    // drawing:{
    //   base64:{type: String, default: ['']},
    //   backgroundForms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    //   dateDrawing:{type: Date},
    //   users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    // },
    drawingSignature:{
      // isSigned:{type: Boolean, default: false},
      dateSignature: {type: Date, default: [Date()]},
      namePicture:{type: String, default: ['']},
      // backgroundForms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
      // dateDrawing:{type: Date},
      users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    },

    typeQuote: {type: String, default: ['quote']},
    // _users : [{type: Schema.Types.ObjectId, ref: 'User'}],
    forms: [{type: Schema.Types.ObjectId, ref: 'Form'}],
    devisDetails: [
      {
        nameBucketProducts: {type: String},
        bucketProducts: [
          {
            typeRow: {type: String},
            title: {type: String, default: ['']},
            priceWithoutTaxes: {type: Number},
            priceWithTaxes: {type: Number},
            priceWithQuantity: {type: Number},
            priceWithTaxesWithQuantity: {type: Number},
            priceWithQuantityWithDiscount: {type: Number},
            priceWithTaxesWithQuantityWithDiscount: {type: Number},
            vat: {type: Number},
            quantity: {type: Number, default: 1},
            length: {type: Number, default: 1},
            width: {type: Number, default: 1},
            surface: {type: Number, default: 1},
            discount: {type: Number},
            productInit: [],
            priceWithDiscount: {type: Number},
            // priceWithQuantityWithDiscount: {type: Number},
            // priceWithTaxesWithQuantityWithDiscount: {type: Number},
            priceWithTaxesWithDiscount: {type: Number},
          }
        ]
      }

    ],
    priceQuote: {
      discountGlobal: {type: Number, default: 0},
      vatGlobal: {type: Number, default: 0},
      painfulnessGlobal: {type: Number, default: 0},
      priceQuoteWithoutTaxes: {type: Number, default: 0},
      priceQuoteWithTaxes: {type: Number, default: 0},
      priceGlobalWithDiscount: {type: Number, default: 0},
      priceGlobalWithTaxesWithDiscount: {type: Number, default: 0},

      outstandingBalance: {type: Number, default: 0},
      totalPaiementAmount: {type: Number, default: 0},
      // priceGlobalWithDiscount: {type: Number, default: 0},


      // priceQuoteTaxes: [{
      //   VAT: {type: Number, default: 0},
      //   TotalVAT: {type: Number, default: 0},
      // }]
      // paiementQuote: {type: Number, default: 0},
    },
    // signature:{
    //   isSigned:{type: Boolean, default: false},
    //   base64:{type: String, default: ['']},
    //   dateSignature:{type: Date},
    //   users:[{type: Schema.Types.ObjectId, ref: 'User'}],
    // }
    // ,
    // paiements:[
    //   {
    //     datePaiement:{type: Date},
    //     amount: {type: Number},
    //     type: {type: String},
    //   }
    // ]

  },
  {
    timestamps: true
  });

quote.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Quote', quote);
