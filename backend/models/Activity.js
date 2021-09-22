const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  activity: {
    type: String,
    required: [true, 'Activity is required'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
