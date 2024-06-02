// Funciones con las queries que lanzamos contra la tabla autor
const selectAll = () => {
  return db.query("select * from autores");
};

const selectById = (autorId) => {
  return db.query("select * from autores where id = ?", [autorId]);
};

// req.body
// insert(req.body)
const insert = ({ nombre, email, imagen }) => {
  return db.query(
    "insert into autores (nombre, email, imagen) values (?, ?, ?)",
    [nombre, email, imagen]
  );
};

// updateById(5, BODY)
const updateById = (autor_id, { nombre, email, imagen }) => {
  return db.query(
    `update autores
        set nombre = ?, email = ?, imagen = ?
        where id = ?`,
    [nombre, email, imagen, autor_id]
  );
};

const deleteById = (autor_id) => {
  return db.query("DELETE FROM autores WHERE id = ?", [autor_id]);
};



module.exports = {
  selectAll,
  selectById,
  insert,
  updateById,
  deleteById
};
