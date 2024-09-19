const {
  getInventoryItem,
  getAllCategories,
  getAllSuppliers,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../db/queries");
require("dotenv").config();

const itemsGetItem = async (req, res) => {
  // Get itemid
  try {
    const { itemId } = req.params;
    let id = Number(itemId);
    const item = await getInventoryItem(id);
    res.render("items/item", { item });
  } catch (err) {
    console.error(err);
  }
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
    res.status(400).json({ message: "Issue creating new item" });
    throw new Error("Database did not accept query");
  }
};

const itemsPostUpdateItem = async (req, res) => {
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
    const id = Number(req.params.itemId);
    const results = await updateInventoryItem({
      id,
      name,
      count,
      unit,
      category_id,
      supplier_id,
    });
    res.redirect("/");
  } catch (err) {
    res.status(400);
    console.error(err);
  }
};

const itemsDeleteItem = async (req, res) => {
  const { itemId, password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .json({ accepted: false, message: "Incorrect password" });
  }

  // check if item exists
  const id = Number(itemId);
  const item = await getInventoryItem(id);
  if (!item) {
    return res.status(404).json({ accepted: false, message: "Item not found" });
  }
  const itemName = item.name;
  // delete item
  await deleteInventoryItem(id);
  return res
    .status(200)
    .json({ accepted: true, message: `${itemName} was successfully deleted` });
};

module.exports = {
  itemsGetItem,
  itemsGetCreateItem,
  itemsPostCreateItem,
  itemsGetUpdateItem,
  itemsPostUpdateItem,
  itemsDeleteItem,
};
