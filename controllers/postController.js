// controllers/postController.js
const PostModel = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.file ? req.file.path : req.body.image;
    
    const newItem = new PostModel({ title, content, image, author });
    await newItem.save();
    
    res.json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await PostModel.find({ author: username });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
