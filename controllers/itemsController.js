const {
  getAllCategories,
  getAllSuppliers,
  addInventoryItem,
  getInventoryItem,
} = require("../db/queries");

const itemsGetItem = async (req, res) => {
  console.log("itemsGetItem WIP");
  res.render("GET /:id");
  // get item from db and list its info
};

const itemsGetUpdateItem = async (req, res) => {
  // const item = getInventoryItem(req.params.id)
  let { itemId: id } = req.params;
  id = Number(id);
  const [item, categories, suppliers] = await Promise.all([
    getInventoryItem(id),
    getAllCategories(),
    getAllSuppliers(),
  ]);
  res.render("items/editItem", { item, categories, suppliers });
  // update item
};

const itemsDeleteItem = async (req, res) => {
  res.render("DELETE /:id WIP");
  // delete
};

const itemsGetCreateItem = async (req, res) => {
  const [categories, suppliers] = await Promise.all([
    getAllCategories(),
    getAllSuppliers(),
  ]);
  res.render("items/newItem", { categories: categories, suppliers: suppliers });
};

const itemsPostCreateItem = async (req, res) => {
  try {
    let {
      name,
      count,
      unit,
      category: category_id,
      supplier: supplier_id,
    } = req.body;
    count = Number(count);
    category_id = Number(category_id);
    supplier_id = Number(supplier_id);
    addInventoryItem({ name, count, unit, category_id, supplier_id });
    res.redirect("/items/new");
  } catch (err) {
    res.send("Database error");
    throw new Error("Database did not accept query");
  }
};

module.exports = {
  itemsGetItem,
  itemsGetUpdateItem,
  itemsDeleteItem,
  itemsGetCreateItem,
  itemsPostCreateItem,
};
