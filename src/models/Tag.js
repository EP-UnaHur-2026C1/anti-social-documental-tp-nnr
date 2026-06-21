const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema(
  {
   nombre: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;