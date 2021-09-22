const mongoose = require('mongoose');
const validator = require('validator');
const slug = require('slugify');
const Activity = require('./Activity');

const centerSchema = mongoose.Schema(
  {
    centerName: {
      type: String,
      required: [true, 'A center must have a name.'],
      trim: true,
    },
    centerEmail: {
      type: String,
      required: [true, 'A center must have an email address'],
      unique: true,
      validate: [validator.isEmail, 'A valid email address is needed!'],
    },
    centerAddress: {
      type: String,
      required: [true, 'A center must have an address'],
      trim: true,
    },
    centerCity: {
      type: String,
      required: [true, 'A center must have a city'],
      trim: true,
    },
    centerState: {
      type: String,
      required: [true, 'A center must be have a state property!'],
    },
    centerLga: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// centerSchema.pre(/^find/, function (next) {});

centerSchema.virtual('branches', {
  ref: 'Branch',
  foreignField: 'center',
  localField: '_id',
});

centerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'createdBy',
    select: 'name',
  });

  next();
});

centerSchema.pre('save', async function (next) {
  if (this.isNew) {
    activityDetails = {
      activity: 'Center created',
      user: this._id,
    };

    const activity = await Activity.create(activityDetails);
  } else {
    activityDetails = {
      activity: 'Center details modified',
      user: this._id,
    };

    const activity = await Activity.create(activityDetails);
  }

  next();
});

const Center = mongoose.model('Center', centerSchema);
module.exports = Center;
