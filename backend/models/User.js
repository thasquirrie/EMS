const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Activity = require('./Activity');

const userSchema = mongoose.Schema(
  {
    lastName: {
      type: String,
      required: [true, 'A user must have a last name'],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, 'A user must have a first name'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    nin: {
      type: String,
      required: [true, 'A user must have NIN'],
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
    email: {
      type: String,
      required: [true, 'A user must have a name'],
      unique: true,
      trim: true,
    },
    phone: {
      type: 'String',
      required: [true, 'A user must have a phone number'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    center: {
      type: mongoose.Schema.ObjectId,
      ref: 'Center',
    },
    address: {
      type: String,
    },
    userState: String,
    city: String,
    lga: String,
    country: String,
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      trim: true,
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passords does not match!',
      },
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'center-manager', 'admin', 'super-admin'],
      default: 'admin',
    },
    approved: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    createdby: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'center',
    select: 'centerName address',
  });
  next();
});

// userSchema.pre('save', function(next) {

// })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 2000;

  next();
});

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    activityDetails = {
      activity: 'Account created',
      user: this._id,
    };

    const activity = await Activity.create(activityDetails);
  } else {
    activityDetails = {
      activity: 'Account details modified',
      user: this._id,
    };

    const activity = await Activity.create(activityDetails);
  }

  next();
});

userSchema.methods.comparePasswords = async function (
  userPassword,
  candidatePassword
) {
  return await bcrypt.compare(userPassword, candidatePassword);
};

userSchema.methods.passwordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = this.passwordChangedAt / 1000;
    return JWTTimestamp < passwordChangedTime;
  }

  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
