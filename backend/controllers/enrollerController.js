const Enrollee = require('../models/Enrollee');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllEnrollees = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.centerId) {
    filter = { center: req.params.centerId };
  } else if (req.user.role === 'admin' || req.user.role === 'user') {
    filter = { center: req.user.center._id };
  }

  const features = new APIFeatures(Enrollee.find(filter), req.query)
    .filter()
    .sort()
    .field()
    .paginate();

  const enrollees = await features.query;

  res.status(200).json({
    status: 'success',
    results: enrollees.length,
    data: {
      enrollees,
    },
  });
});

exports.getEnrollee = catchAsync(async (req, res, next) => {
  const enrollee = await Enrollee.findById(req.params.id);

  if (!enrollee)
    return next(
      new AppError(
        `No Enrollee with this id: ${req.params.id} found in this database`,
        404
      )
    );

  res.status(200).json({
    status: 'success',
    data: {
      enrollee,
    },
  });
});

exports.createEnrollee = catchAsync(async (req, res, next) => {
  const newEnrollee = await Enrollee.create(req.body);

  console.log(req.body);
  newEnrollee.user = req.user.id;
  newEnrollee.center = req.user.center.id;

  await new Enrollee(newEnrollee).save();

  res.status(201).json({
    status: 'success',
    data: {
      enrollee: newEnrollee,
    },
  });
});

exports.updateEnrollee = catchAsync(async (req, res, next) => {
  // const {firstName, middleName, lastName, trackingID, BVN, phone, associatedTrackingID, dateOfBirth, gender, channel}

  const updatedEnrollee = await Enrollee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (updatedEnrollee.nin) {
    updatedEnrollee.status = 'NIN Out';
  }

  // const enrollee = await Enrollee.findById(req.params.id);

  if (!updatedEnrollee)
    return next(
      new AppError(
        `The Enrollee with the specified id: ${req.params.id} does not exist in the database!`,
        404
      )
    );

  // const updatedEnrollee = enrollee.

  // const updatedEnrollee = await

  // if (req.body.nin) {
  //   updatedEnrollee
  // }

  await updatedEnrollee.save();

  res.status(203).json({
    status: 'success',
    data: {
      enrollee: updatedEnrollee,
    },
  });
});

exports.deleteEnrollee = catchAsync(async (req, res, next) => {
  const deletedEnrollee = await Enrollee.findByIdAndDelete(req.params.id);

  if (!deletedEnrollee)
    return next(
      new AppError(
        `No Enrollee with the specified id: ${req.params.id} exists in the database`
      )
    );

  res.status(204).json({
    status: 'success',
    message: 'Enrollee deleted successfully!',
  });
});
