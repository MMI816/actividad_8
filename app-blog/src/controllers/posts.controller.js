const Post = require("../models/post.model");

const getAllPosts = async (req, res, next) => {
  try {
    const [result] = await Post.selectAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.selectById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ error: "El post no existe" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const [result] = await Post.insert(req.body);
    // Como respuesta devolvemos el post creado
    const post = (await Post.selectById(result.insertId))[0];
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  // req.body: { titulo, descripcion, fecha_creacion, categoria, autor_id }
  // req.params: { post_id }
  try {
    const { post_id } = req.params;

    const [result] = await Post.updateById(post_id, req.body);
    if (result.changedRows === 1) {
      const post = (await Post.selectById(post_id));
      res.json(post);
    } else {
      res.status(400).json({ error: "Se ha producido un error al actualizar" });
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  // req.params - { post_id }
  try {
    const { post_id } = req.params;

    const [result] = await Post.deleteById(post_id);

    if (result.affectedRows === 1) {
      res.json({ message: "Se ha borrado el post" });
    } else {
      res.status(404).json({ message: "El post no existe" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
};
