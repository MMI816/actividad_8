// Funciones con las queries que lanzamos contra la tabla posts

const selectAll = () => {
  return db.query(`
      SELECT p.*, a.nombre AS nombre_autor, a.email AS email_autor
      FROM posts AS p
      LEFT JOIN autores AS a ON p.autor_id = a.id
    `);
};

const selectById = async (postId) => {
  try {
    const [posts] = await db.query(
      `SELECT p.*, a.nombre AS nombre_autor, a.email AS email_autor
       FROM posts AS p
       INNER JOIN autores AS a ON p.autor_id = a.id
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
const insert = ({
  titulo,
  descripcion,
  fecha_creacion,
  categoria,
  autor_id,
}) => {
  return db.query(
    "insert into posts (titulo, descripcion, fecha_creacion, categoria, autor_id) values (?, ?, ?, ?, ?)",
    [titulo, descripcion, fecha_creacion, categoria, autor_id]
  );
};

// updateById(post_id, req.body)
const updateById = (
  post_id,
  { titulo, descripcion, fecha_creacion, categoria, autor_id }
) => {
  return db.query(
    `update posts
        set titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, autor_id = ?
        where id = ?`,
    [ titulo, descripcion, fecha_creacion, categoria, autor_id, post_id,]
  );
};

const deleteById = (post_id) => {
  return db.query("DELETE FROM posts WHERE id = ?", [post_id]);
};

module.exports = {
  selectAll,
  selectById,
  insert,
  updateById,
  deleteById,
};
