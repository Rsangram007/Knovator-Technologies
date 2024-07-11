const mongoose = require('mongoose');
const Joi = require('joi');

// Define Mongoose schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    // Using regex to validate email format
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024  // Assuming password hash will be stored
  }
});

// Validate using Joi
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(255).required()
  });
  return schema.validate(user);
}

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };
