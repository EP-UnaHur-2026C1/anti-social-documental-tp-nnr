const Tag = require('../models/Tag');

// GET /tag
const getTags = async (req, res) => {
  try {
    const tag = await Tag.find().select(
      "-createdAt -updatedAt -__v",
    );
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener los tags",
      error: error.message});
  }
};

// GET /tag/:id
const getTagById = async (req, res) => {
  try {

    const { id } = req.params

    const tag = await Tag.findById(id);

    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener el tag",
      error: error.message});
  }
};

// POST /tag
const createTag = async (req, res) => {
  try {

    const { nombre } = req.body

    const tag = await Tag.create({ nombre });

    res.status(201).json({message:"Tag creado"});
  } catch (error) {
    res.status(500).json({ 
      message: "Error al crear el tag",
      error: error.message});
  }
};

// PUT /tag/:id
const updateTag = async (req, res) => {
  try {

    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json({mensaje:`Tag actualizado`});
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el tag",
      error:error.message})
  }
};

// DELETE /tag/:id
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params
    
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag no encontrado' });
    }
    res.status(200).json({mensaje:`Tag eliminado`})
  }
    catch(error){
        res.status(500).json({
          mensaje: "Error al eliminar el tag",
        error: error.message})
    }
};

module.exports = { getTags, getTagById, createTag, updateTag, deleteTag };