const {
  getAllInventoryItems,
  getAllSuppliers,
  getAllCategories,
} = require("../db/queries");

const appGet = async (req, res) => {
  const [inventoryItems, categories, suppliers] = await Promise.all([
    getAllInventoryItems(),
    getAllCategories(),
    getAllSuppliers(),
  ]);
  res.render("index", { inventoryItems, categories, suppliers });
};

module.exports = {
  appGet,
};
