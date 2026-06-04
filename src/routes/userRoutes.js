const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware');

const {
    profile
} = require('../controllers/userController');

router.get('/profile', protect, profile);

module.exports = router;