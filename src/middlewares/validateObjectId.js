const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido' });
  }
  next(); // id válido → continúa al controller
};

module.exports = validateObjectId;