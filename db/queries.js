const pool = require("./pool");

async function getInventoryItem(id) {
  const text = `SELECT * FROM inventory_items WHERE id = $1;`;
  const values = [id];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllSuppliers() {
  const { rows } = await pool.query("SELECT * FROM suppliers");
  return rows;
}

async function getAllInventoryItems() {
  const { rows } = await pool.query("SELECT * FROM inventory_items");
  return rows;
}

async function addInventoryItem({
  name,
  count,
  unit,
  category_id,
  supplier_id,
}) {
  const text = `INSERT INTO inventory_items (name, count, unit, category_id, supplier_id) VALUES
  ($1, $2, $3, $4, $5);`;
  const values = [name, count, unit, category_id, supplier_id];

  const res = await pool.query(text, values);
  console.log(res.rows[0]);
}

async function deleteInventoryItem(id) {
  // WIP, not sure if deleting returns a result, and if so what does it return?
  const text = `DELETE FROM inventory_items WHERE id = $1;`;
  const values = [id];
  const res = await pool.query(text, values);
  console.log(res.rows);
}

module.exports = {
  getAllCategories,
  getAllInventoryItems,
  getAllSuppliers,
  addInventoryItem,
  deleteInventoryItem,
  getInventoryItem,
};
