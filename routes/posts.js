// routes/posts.js
const express = require('express');
const upload = require('../middleware/uplode');
const { createPost, getAllPosts, getUserPosts } = require('../controllers/postController');
const router = express.Router();

router.post('/create', upload.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:username', getUserPosts);

module.exports = router;
