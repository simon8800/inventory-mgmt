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

async function getAllInventoryItems(sortValue) {
  text =
    "SELECT inventory_items.id, inventory_items.name, inventory_items.count, inventory_items.unit, inventory_items.supplier_id, inventory_items.category_id FROM inventory_items";
  let newText = helpSortBy(text, sortValue);

  const { rows } = await pool.query(newText);
  return rows;
}

async function getAllInventoryItemsBy({
  filterCategoryId,
  sortValue = "name",
}) {
  let text =
    "SELECT inventory_items.id, inventory_items.name, inventory_items.count, inventory_items.unit, inventory_items.supplier_id, inventory_items.category_id FROM inventory_items";
  let values = [];

  if (filterCategoryId !== null) {
    text = text.concat(" ", "WHERE category_id = $1");
    values.push(filterCategoryId);
  }

  text = helpSortBy(text, sortValue);

  const { rows } = await pool.query(text, values);
  return rows;
}

function helpSortBy(text, sortValue) {
  if (sortValue === "name" || sortValue === "count") {
    text = text.concat(" ", `ORDER BY ${sortValue}`);
  } else if (sortValue === "category") {
    let textArr = text.split(" ");
    let inventoryItemsIndex = textArr.findIndex(
      (term) => term === "inventory_items"
    );
    let joinText =
      "JOIN categories ON inventory_items.category_id = categories.id";
    let orderByCategoryText = "ORDER BY categories.name";
    text = [].concat(
      textArr.slice(0, inventoryItemsIndex + 1),
      [joinText],
      textArr.slice(inventoryItemsIndex + 1),
      [orderByCategoryText]
    );
    text = text.join(" ");
  }
  return text;
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
  return;
}

async function updateInventoryItem({
  id,
  name,
  count,
  unit,
  category_id,
  supplier_id,
}) {
  // UPDATE weather SET temp_lo = temp_lo+1, temp_hi = temp_lo+15, prcp = DEFAULT
  // WHERE city = 'San Francisco' AND date = '2003-07-03';
  const text = `UPDATE inventory_items SET 
  name = $1, count = $2, unit = $3, category_id = $4, supplier_id = $5
  WHERE id = $6`;
  const values = [name, count, unit, category_id, supplier_id, id];
  await pool.query(text, values);
  return;
}

async function deleteInventoryItem(id) {
  // WIP, not sure if deleting returns a result, and if so what does it return?
  const text = `DELETE FROM inventory_items WHERE id = $1;`;
  const values = [id];
  const res = await pool.query(text, values);
}

module.exports = {
  getInventoryItem,
  getAllCategories,
  getAllInventoryItems,
  getAllInventoryItemsBy,
  getAllSuppliers,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
