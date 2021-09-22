const Branch = require('../models/Branch');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllBranches = catchAsync(async (req, res, next) => {
 // let filter = {};
 // const branchs = await branchs.find()

 let filter = {};
 if (req.params.centerId) {
  filter = { center: req.params.centerId };
 } else if (req.user.role === 'admin') {
  filter = { center: req.user.center._id };
 }

 const features = new APIFeatures(
  Branch.find(filter).populate({ path: 'users' }),
  req.query
 )
  .filter()
  .sort()
  .field()
  .paginate();

 const branches = await features.query;
 res.status(200).json({
  status: 'success',
  results: branches.length,
  data: {
   branches,
  },
 });
});

exports.createBranch = catchAsync(async (req, res, next) => {
 //  if (!req.body.center) req.body.center = req.params.centerId;
 if (req.params.centerId) {
  req.body.center = req.params.centerId;
 } else {
  req.body.center = req.user.center._id;
 }

 console.log(req.user.center);

 const newBranch = await Branch.create(req.body);

 if (!req.body)
  return next(
   new AppError('Please fill out the necessary details to continue', 400)
  );

 res.status(201).json({
  status: 'success',
  data: {
   branch: newBranch,
  },
 });
});

exports.getBranch = catchAsync(async (req, res, next) => {
 const branch = await Branch.findById(req.params.id);

 if (!branch)
  return next(
   new AppError(
    `No branch with the id: ${req.params.id} found in the database`,
    404
   )
  );

 res.status(200).json({
  status: 'success',
  data: {
   branch,
  },
 });
});

exports.editBranch = catchAsync(async (req, res, next) => {
 const updatedBranch = await Branch.findByIdAndUpdate(req.params, req.body, {
  runValidators: true,
  new: true,
 });

 if (!updatedBranch)
  return next(
   new AppError(
    `No branch with the id: ${req.params.id} found in the database`,
    404
   )
  );

 res.status(200).json({
  status: 'success',
  data: {
   branch: updatedBranch,
  },
 });
});

exports.deleteBranch = catchAsync(async (req, res, next) => {
 const branch = await Branch.findByIdAndDelete(req.params.id);

 if (!branch)
  return next(
   new AppError(
    `No branch with the id: ${req.params.id} found in the database`,
    404
   )
  );

 res.status(204).json({
  status: 'success',
 });
});
