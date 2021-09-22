const Center = require('../models/Center');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllCenters = catchAsync(async (req, res, next) => {
  let filter;
  // const centers = await centers.find()

  if (req.user.role === 'admin') {
    filter = req.user.center._id;
  }

  // console.log(req.user);
  // const features = new APIFeatures(
  //   Center.find().populate({ path: 'branches' }),
  //   req.query
  // )
  //   .filter()
  //   .sort()
  //   .field()
  //   .paginate();

  // const centers = await features.query;

  const centers = await Center.find(filter);

  // console.log(centers);

  res.status(200).json({
    status: 'success',
    results: centers.length,
    data: {
      centers,
    },
  });
});

exports.createCenter = catchAsync(async (req, res, next) => {
  const newCenter = await Center.create(req.body);

  if (!req.body)
    return next(
      new AppError('Please fill out the necessary details to continue', 400)
    );

  res.status(201).json({
    status: 'success',
    data: {
      center: newCenter,
    },
  });
});

exports.getCenter = catchAsync(async (req, res, next) => {
  const center = await Center.findById(req.params.id);

  if (!center)
    return next(
      new AppError(
        `No center with the id: ${req.params.id} found in the database`,
        404
      )
    );

  res.status(200).json({
    status: 'success',
    data: {
      center,
    },
  });
});

exports.editCenter = catchAsync(async (req, res, next) => {
  const updatedCenter = await Center.findByIdAndUpdate(req.params, req.body, {
    runValidators: true,
    new: true,
  });

  if (!updatedCenter)
    return next(
      new AppError(
        `No center with the id: ${req.params.id} found in the database`,
        404
      )
    );

  res.status(200).json({
    status: 'success',
    data: {
      center: updatedCenter,
    },
  });
});

exports.deleteCenter = catchAsync(async (req, res, next) => {
  const center = await Center.findByIdAndDelete(req.params.id);

  if (!center)
    return next(
      new AppError(
        `No center with the id: ${req.params.id} found in the database`,
        404
      )
    );

  res.status(204).json({
    status: 'success',
  });
});
