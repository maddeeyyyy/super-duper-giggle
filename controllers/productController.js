// controllers/postController.js

const Product = require("../models/Product");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Product.find();
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


exports.searchProducts = async (req, res) => {
  try{
    const{
      query, category, subcategory, minPrice, maxPrice, size, color, inStock
    } = req.query;

    let searchCriteria = {};
    if(query){
      searchCriteria.$or = [
        {title : {$regex: query, $options: 'i'}},
        {description: {$regex: query, $options: 'i'}}
      ];
    }
    if (category) {
      searchCriteria.category = category;
    }

    // Filter by subcategory
    if (subcategory) {
      searchCriteria.subcategory = subcategory;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      searchCriteria.price = {};
      if (minPrice) searchCriteria.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchCriteria.price.$lte = parseFloat(maxPrice);
    }

    // Filter by size
    if (size) {
      searchCriteria.sizes = size;
    }

    // Filter by color
    if (color) {
      searchCriteria.colors = color;
    }

    // Filter by availability (in stock)
    if (inStock === 'true') {
      searchCriteria.stock = { $gt: 0 };
    }

    // Execute the search
    const products = await Product.find(searchCriteria);

    res.json(products);
    console.log(products, 'searched products')
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });git 
  }
}