const Autor = require("../models/autor.model");
const { get } = require("../routes/api/autores");

const getAllAutores = async (req, res, next) => {
  try {
    const [result] = await Autor.selectAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};
    

const getAutorById = async (req, res, next) => {
  try {
    const [result] = await Autor.selectById(req.params.autor_id);

    if (result.length === 0) {
      return res.status(404).json({ error: "El autor no existe" });
    }

    res.json(result[0]);
  } catch (err) {
    next(err);
  }
};

const createAutor = async (req, res, next) => {
  try {
    const [result] = await Autor.insert(req.body);
    // Como respuesta devolvemos el autor creado
    const [[autor]] = await Autor.selectById(result.insertId);
    res.json(autor);
  } catch (err) {
    next(err);
  }
};

const updateAutor = async (req, res, next) => {
  // req.body: { nombre, email, imagen }
  // req.params: { autor_id }
  try {
    const { autor_id } = req.params;

    const [result] = await Autor.updateById(autor_id, req.body);
    if (result.changedRows === 1) {
      const [[autor]] = await Autor.selectById(autor_id);
      res.json(autor);
    } else {
      res.status(400).json({ error: "Se ha producido un error al actualizar" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteAutor = async (req, res, next) => {
  // req.params - { autor_id }
  try {
    const { autor_id } = req.params;

    const [result] = await Autor.deleteById(autor_id);

    if (result.affectedRows === 1) {
      res.json({ message: "Se ha borrado el autor y sus posts" });
    } else {
      res.status(404).json({ message: "El autor no existe" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAutores,
  createAutor,
  updateAutor,
  deleteAutor,
  getAutorById,
};
