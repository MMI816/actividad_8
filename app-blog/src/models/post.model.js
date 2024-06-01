// Funciones con las queries que lanzamos contra la tabla posts
const selectAll = async () => {
    try {
      const [posts] = await db.query(`SELECT p.*, a.nombre AS autor_nombre, a.email AS autor_email
       FROM posts p
       INNER JOIN autores a ON p.autorId = a.id`
    );
    return posts;
  } catch (err) {
    throw err;
  }
};

const selectById = async (postId) => {
  try {
    const [posts] = await db.query(
      `SELECT p.*, a.nombre AS autor_nombre, a.email AS autor_email
       FROM posts p
       INNER JOIN autores a ON p.autorId = a.id
       WHERE p.id = ?`,
      [postId]
    );
    return posts;
  } catch (err) {
    throw err;
  }
};

// req.body
// insert(req.body)
const insert = ({ titulo, descripcion, fecha_creacion, categoria,autorId }) => {
  return db.query(
    "insert into posts (titulo, descripcion, fecha_creacion, categoria) values (?, ?, ?, ?)",
    [titulo, descripcion, fecha_creacion, categoria, autorId]
  );
};

// updateById(5, BODY)
const updateById = (
  post_id,
  { titulo, descripcion, fecha_creacion, categoria,autorId }
) => {
  return db.query(
    `update posts
        set titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?
        where id = ?`,
    [titulo, descripcion, fecha_creacion, categoria,autorId, post_id]
  );
};

const deleteById = (post_id) => {
  return db.query("DELETE FROM paciente WHERE id = ?", [post_id]);
};

module.exports = {
    selectAll,
    selectById,
    insert,
    updateById,
    deleteById
};
