const mongoose = require("mongoose");
const Joi = require("joi");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 5, maxlength: 255 },
    body: { type: String, required: true, minlength: 10 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: { type: Boolean, default: true },
    geoLocation: {
      latitude: { type: Number, required: true,  }, // Latitude bounds
      longitude: { type: Number, required: true,  }, // Longitude bounds
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post };
