const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Function to filter unwanted fields from the body of request
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  console.log('This was called');
  let filter = {};

  if (req.params.centerId) {
    filter = { center: req.params.centerId };
  } else if (req.user.role === 'admin') {
    filter = { center: req.user.center._id };
  }

  // console.log(filter);

  const users = await User.find(filter);

  res.status(200).json({
    status: 'success',
    length: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return next(
      new AppError(
        `No user with the provided id: ${req.params.id} found in the database`,
        404
      )
    );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  console.log('ID:', req.params.id);
  const filteredFields = filterObj(
    req.body,
    'firstName',
    'middleName',
    'lastName',
    'email',
    'phone',
    'gender',
    'city',
    'lga',
    'country',
    'role',
    'center',
    'address',
    'userState'
  );

  console.log(filteredFields);

  const updatedUser = await User.findByIdAndUpdate(
    // req.user.id,
    req.params.id,
    filteredFields,
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Updated successfully',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return next(
      new AppError(
        `No user with the provided id: ${req.params.id} found in the database`,
        404
      )
    );

  res.status(204).json({
    status: 'success',
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    nin,
    role,
    center,
    phone,
    userState,
    city,
    lga,
    country,
    address,
  } = req.body;

  const details = {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    nin,
    role,
    center,
    phone,
    userState,
    city,
    lga,
    country,
    address,
  };

  if (!details)
    return next(
      new AppError('Please fill in the necessary details to sign up', 400)
    );

  console.log(details);

  const newUser = await User.create(details);

  newUser.createdby = req.user.id;
  newUser.approved = true;
  newUser.role = 'user';

  await newUser.save();

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// exports.createUserForACenter = catchAsync(async (req, res, next) => {
//   if (!req.body.center) {
//     if (req.user.role === 'admin') {
//       req.body.center = req.user.center._id;
//     } else {
//       req.body.center = req.params.centerId;
//     }
//   }

//   console.log(req.body.center);

//   req.body.role = 'user';
//   next();
// });

exports.createManagerForCenter = catchAsync(async (req, res, next) => {
  req.body.role = 'center-manager';
  if (!req.body.center) req.body.center = req.params.centerId;
  console.log(req.body.role);
  next();
});

// exports.createUserForBranch = catchAsync(async (req, res, next) => {});
