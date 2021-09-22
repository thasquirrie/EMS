const express = require('express');
const authController = require('../controllers/authController');
const centerController = require('../controllers/centerController');
const userRoutes = require('../routes/userRoutes');
branchRoutes = require('../routes/branchRoutes');

const router = express.Router();

router.use(
  authController.protect,
  authController.authorized('super-admin', 'admin')
);

router.use('/:centerId/users', userRoutes);
router.use('/:centerId/branches', branchRoutes);

router
  .route('/')
  .get(centerController.getAllCenters)
  .post(centerController.createCenter);
router
  .route('/:id')
  .get(centerController.getCenter)
  .patch(centerController.editCenter)
  .delete(centerController.deleteCenter);

module.exports = router;
