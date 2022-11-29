const mongoose = require("mongoose");

const { Schema } = mongoose;

// const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    content: {
      type: String,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
