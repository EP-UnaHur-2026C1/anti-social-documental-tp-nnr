const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true
    },
    visible: {
      type: Boolean,
      default: true
    },
    postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },

  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;