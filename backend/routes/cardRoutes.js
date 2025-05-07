const express = require('express');
const router = express.Router();
const { getCards, createCard } = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.get('/', getCards);
router.post('/', authMiddleware, upload.single('image'), createCard);

module.exports = router;
