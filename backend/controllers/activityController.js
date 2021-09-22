const Activity = require('../models/Activity');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllActivities = catchAsync(async (req, res, next) => {
  const activities = await Activity.find();

  res.status(200).json({
    status: 'success',
    length: activities.length,
    data: {
      activities,
    },
  });
});

exports.getActivity = catchAsync(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity)
    return next(
      new AppError(
        `No activity with this id: ${req.params.id} exists on this server`,
        404
      )
    );

  res.status(200).json({
    status: 'success',
    data: {
      activity,
    },
  });
});
