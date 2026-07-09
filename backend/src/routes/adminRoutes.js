// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { authenticateAdmin } = require('../middleware/auth');

//router.post('/register', authenticateAdmin, adminController.registerAdmin);
router.post('/login', authenticateAdmin, adminController.loginAdmin);

//router.post('/add', adminController.addNewAdmin);

router.post('/add', authenticateAdmin, adminController.addNewAdmin);
/*router.get(
  '/search-prisoner',
  auth('PrisonAdmin'),
  adminController.searchPrisoner,
); */

router.post(
  '/register-prisoner',
  authenticateAdmin,
  adminController.registerPrisoner,
);
router.get(
  '/prisoner/:id',
  authenticateAdmin,
  adminController.getPrisonerDetails,
);
router.put('/update-balance', authenticateAdmin, adminController.updateBalance);

module.exports = router;
