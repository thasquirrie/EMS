const express = require('express');
const enrolleeController = require('../controllers/enrollerController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, enrolleeController.getAllEnrollees)
  .post(authController.protect, enrolleeController.createEnrollee);
router
  .route('/:id')
  .get(enrolleeController.getEnrollee)
  .patch(enrolleeController.updateEnrollee)
  .delete(enrolleeController.deleteEnrollee);

module.exports = router;
