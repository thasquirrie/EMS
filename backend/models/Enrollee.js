const mongoose = require('mongoose');

const enrolleeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A user must have a firstName'],
    },
    lastName: {
      type: String,
      required: [true, 'A user must have a lastName'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    middleName: String,
    email: String,
    trackingID: {
      type: String,
      required: [true, 'An enrollee must have a trackingID!'],
      minlength: 15,
      maxlength: 15,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'An enroller must have a phone number'],
    },
    associatedTrackingID: {
      type: String,
      // minlength: 15,
    },
    bvn: {
      type: String,
      minlength: 11,
      maxlength: 11,
    },
    status: {
      type: String,
      enum: ['Pending', 'NIN Out'],
      default: 'Pending',
    },
    typeOfTransaction: {
      type: String,
      enum: ['Enrollment', 'Reprint', 'Correction of data', 'Revalidation'],
      default: 'Enrollment',
    },
    modeOfTransaction: {
      type: String,
      enum: ['Cash', 'Transfer', 'POS'],
      default: 'Cash',
    },
    dateCreated: {
      type: String,
      default: Date.now,
    },
    nin: {
      type: String,
      minlength: 11,
      maxlength: 11,
    },
    dateOfBirth: {
      type: String,
      // required: [true, 'An enrollee must have a date of birth'],
    },
    gender: {
      type: String,
      required: [true, 'An enroller must have a gender'],
      enum: ['Male', 'Female'],
    },
    channel: {
      type: String,
      enum: ['Socket', 'Joeson'],
    },
    otherIDProvided: [String],
    plasticIDCard: {
      type: Boolean,
      default: false,
    },
    center: {
      type: mongoose.Schema.ObjectId,
      ref: 'Center',
    },
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: 'Branch',
    },
    address: String,
    addressState: String,
    addressCity: String,
    stateOfOrigin: {
      type: String,
      required: [true, 'An enrollee must have a state of origin'],
    },
    lga: {
      type: String,
      required: [true, 'An enrollee must have an address LGA'],
    },
    lgaOfOrigin: {
      type: String,
      required: [true, 'An enrollee must have an LGA of origin'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

enrolleeSchema.pre('save', function (next) {
  if (!this.isModified('nin')) return next();

  this.status = 'NIN Out';

  next();
});

enrolleeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName',
  });

  this.populate({
    path: 'center',
    select: 'centerName',
  });
  next();
});

const Enrollee = mongoose.model('Enrollee', enrolleeSchema);
module.exports = Enrollee;
