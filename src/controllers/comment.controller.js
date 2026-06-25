const Comment = require('../models/Comment');

// GET /comment
const getComments = async (req, res) => {
  try {
    const comentarios = await Comment.find()
    .populate("userId", "nickName nombre")
    .populate("postId", "description")
    .select("-createdAt -updatedAt -__v",);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener los comentarios",
      error: error.message});
  }
};

// GET /comment/:id
const getCommentById = async (req, res) => {
  try {

    const { id } = req.params
    
    comment = await Comment.findById(id)
    .populate("userId")
    .populate("postId");

    if (!comment) {
    return res.status(404).json({ message: 'Commentario no encontrado' });}

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el comentario",
      error: error.message});
  }
};

// POST /comment
const createComment = async (req, res) => {
  try {

    const { descripcion, visible, postId, userId} = req.body

    const comment = await Comment.create({descripcion,visible,postId,userId});

    res.status(201).json({message:"Comentario creado"});
  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear el comentario",
      error: error.message});
  }
};

// PUT /comment/:id
const updateComment = async (req, res) => {
  try {

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,{new:true, runValidators: true}
    );
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json({message:`Comentario actualizado`});
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el comentario",
      error:error.message})
  }
};

// DELETE /comment/:id
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.status(200).json({message:`Comentario eliminado`})
  }
    catch(error){
        res.status(500).json({
          message: "Error al eliminar el comentario",
        error: error.message})
    }
};

module.exports = { getComments, getCommentById, createComment, updateComment, deleteComment };