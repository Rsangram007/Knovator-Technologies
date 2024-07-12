const express = require("express");
const app = express.Router();
const { authenticate } = require("../middleware/authMiddleware");
const { Post } = require("../Model/Post");

// Create a new post
app.post("/createpost", authenticate, async (req, res) => {
  try {
    
    console.log(req.user);
    const { title, body, geoLocation, active } = req.body;

    const newPost = new Post({
      title,
      body,
      createdBy: req.user._id, // Authenticated user's ID
      geoLocation,
      active
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Get all posts created by the current use
app.get("/getAllpost", authenticate, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id });
    res.status(200).json({TotalPost:posts.length,AllPost:posts});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific post by its ID
app.get("/getpostbyid/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Update a post by ID
app.put("/updatepostbyid/:id", authenticate, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, body, geoLocation, active } = req.body;
     
        
    
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          {
            title,
            body,
            geoLocation,
            active,
          },
          { new: true }
        );
    
        if (!updatedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.json({ message: 'Post updated successfully', post: updatedPost });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

// Delete a post by ID
app.delete("/deletepostbyid/:id", authenticate, async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve posts by latitude and longitude
app.get("/location", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
    
        if (!latitude || !longitude) {
          return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }
    
        const posts = await Post.find({
          "geoLocation.latitude": parseFloat(latitude),
          "geoLocation.longitude": parseFloat(longitude),
        });
    console.log(posts)
        res.send(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

// Get count of active and inactive posts 
app.get("/counts", async (req, res) => {
  try {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });

    res.json({ activeCount, inactiveCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
