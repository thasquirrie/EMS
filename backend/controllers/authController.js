const { promisify } = require('util');
// const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Center = require('../models/Center');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const Activity = require('../models/Activity');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  process.env.NODE_ENV === 'production' && (cookieOptions.secure = true);

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.superAdmin = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    nin,
    gender,
    address,
    userState,
    city,
    lga,
    country,
  } = req.body;

  const details = {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    nin,
    gender,
    address,
    userState,
    city,
    lga,
    country,
  };

  const superAdmin = await User.create(details);

  // activityDetails = {
  //   activity: `Account created! Super-admin role.`,
  // };

  // const newActivity = await Activity.create(activityDetails);

  // newActivity.user = superAdmin._id;

  // await newActivity.save();

  superAdmin.role = 'super-admin';
  await superAdmin.save();

  createSendToken(superAdmin, 201, res);
});

exports.signUp = catchAsync(async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    nin,
    role,
    address,
    userState,
    lga,
    city,
    country,
    gender,
    centerName,
    centerAddress,
    centerCity,
    centerState,
    centerEmail,
    centerLga,
  } = req.body;

  const details = {
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    nin,
    phone,
    address,
    userState,
    lga,
    city,
    country,
    gender,
  };

  const centerDetails = {
    centerName,
    centerAddress,
    centerEmail,
    centerCity,
    centerState,
  };

  console.log(centerDetails);

  if (!details || !centerDetails)
    return next(
      new AppError('Please fill in the necessary details to sign up', 400)
    );

  const newCenter = await Center.create(centerDetails);

  const newUser = await User.create(details);

  newUser.center = newCenter.id;
  newUser.role = 'admin';

  await newUser.save();

  console.log(newUser);

  // activityDetails = {
  //   activity: `Account created!.`,
  // };

  // const newActivity = await Activity.create(activityDetails);

  // newActivity.user = newUser._id;

  // await newActivity.save();

  // createSendToken(newUser, 201, res);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide the email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('Email not found on this server', 404));
  }

  const checked = await user.comparePasswords(password, user.password);

  if (!user || !checked)
    return next(
      new AppError(
        'Invalid login details. Try again with the correct details',
        401
      )
    );

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = '';

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // console.log({ token });

  if (!token) return next(new AppError('You are not logged in! Please login'));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError(
        'This token does not belong to any user in the database',
        404
      )
    );

  const checked = user.passwordChanged(decoded.iat);

  if (checked)
    return next(
      new AppError(
        'Password has been changed since last login. Login with the new details',
        401
      )
    );

  req.user = user;

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, confirmPassword } = req.body;

  if (!req.body)
    return next(
      new AppError('Please provide the necessary details to continue!', 400)
    );

  const user = await User.findById(req.user.id).select('+password');

  const checkPassword = await user.comparePasswords(password, user.password);

  if (!checkPassword)
    return next(new AppError('Password provided is wrong.', 400));

  user.password = newPassword;
  user.confirmPassword = confirmPassword;

  await user.save();

  console.log(user);

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully!',
  });
});

exports.authorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not authorized to perform this operation')
      );

    return next();
  };
};
