const express = require('express');
const authController = require('../controllers/authController');
const branchController = require('../controllers/branchController');

const router = express.Router({ mergeParams: true });

router.use(
 authController.protect,
 authController.authorized('super-admin', 'admin')
);

router
 .route('/')
 .get(branchController.getAllBranches)
 .post(branchController.createBranch);
router
 .route('/:id')
 .get(branchController.getBranch)
 .patch(branchController.editBranch)
 .delete(branchController.deleteBranch);

module.exports = router;
