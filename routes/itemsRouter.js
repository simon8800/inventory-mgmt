const path = require("path");
const express = require("express");
const {
  itemsGetCreateItem,
  itemsGetItem,
  itemsPostCreateItem,
  itemsGetUpdateItem,
  itemsDeleteItem,
} = require("../controllers/itemsController");

const itemsRouter = express.Router();
const assetsPath = path.join(__dirname, "../public");
itemsRouter.use(express.static(assetsPath));

itemsRouter.get("/new", itemsGetCreateItem);
itemsRouter.get("/:itemId", itemsGetItem);
itemsRouter.post("/new", itemsPostCreateItem);
itemsRouter.get("/:itemId/edit", itemsGetUpdateItem);
itemsRouter.delete("/:itemId", itemsDeleteItem);

module.exports = itemsRouter;
