const {
  getAllInventoryItems,
  getAllInventoryItemsBy,
  getAllSuppliers,
  getAllCategories,
} = require("../db/queries");

const appGet = async (req, res) => {
  const { category = 0, sortBy = "name" } = req.query;

  let categoryFilterOn = false;
  let queryParams = { filterCategoryId: Number(category), sortValue: sortBy };
  if (queryParams.filterCategoryId !== 0) {
    categoryFilterOn = true;
  }

  const [inventoryItems, categories, suppliers] = await Promise.all([
    categoryFilterOn
      ? getAllInventoryItemsBy(queryParams)
      : getAllInventoryItems(sortBy),
    getAllCategories(),
    getAllSuppliers(),
  ]);

  categories.sort((itemA, itemB) => itemA.name.localeCompare(itemB.name));
  categories.unshift({ id: 0, name: "All" });

  res.render("index", {
    inventoryItems,
    categories,
    suppliers,
    category,
    sortBy,
  });
};

module.exports = {
  appGet,
};
