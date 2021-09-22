const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router({ mergeParams: true });

// router.post(
//  '/create-user',
//  authController.protect,
//  authController.authorized('admin'),
//  userController.createUser,
//  authController.signUp
// );

router.post(
  '/create-admin',
  authController.protect,
  authController.authorized('super-admin'),
  userController.createManagerForCenter,
  userController.createUser
);

router.post(
  '/create-user',
  authController.protect,
  authController.authorized('super-admin', 'admin'),
  userController.createUser
  // userController.createUserForACenter
);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.post('/superAdmin', authController.superAdmin);
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router
  .route('/')
  .get(
    authController.protect,
    authController.authorized('super-admin', 'admin'),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    authController.authorized('super-admin'),
    userController.createUser
  );
router
  .route('/:id')
  .get(
    authController.protect,
    authController.authorized('admin', 'super-admin'),
    userController.getUser
  )
  .patch(authController.protect, userController.updateUser)
  .delete(
    authController.protect,
    authController.authorized('admin', 'super-admin'),
    userController.deleteUser
  );

module.exports = router;
