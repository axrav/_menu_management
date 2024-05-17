const Router = require("express").Router;

const {
    createItem,
    getItems,
    getItembyId,
    updateItem,
    deleteItem,
    getItemsBySubCategoryId,
    getItemsByCategoryId,
    searchItems
    } = require("../controllers/item");

const itemRouter = Router();

itemRouter.post("/create-item", createItem);
itemRouter.get("/get-items", getItems);
itemRouter.get("/get-item/:id", getItembyId);
itemRouter.put("/update-item/:id", updateItem);
itemRouter.delete("/delete-item/:id", deleteItem);
itemRouter.get("/get-items-by-sub-category/:id", getItemsBySubCategoryId);
itemRouter.get("/get-items-by-category/:id", getItemsByCategoryId);
itemRouter.get("/search-items/:name", searchItems);

module.exports = itemRouter;
