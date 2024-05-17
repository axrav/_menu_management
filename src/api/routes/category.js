const app = require("express");
const { createCategory, getCategories, getCategorybyId, updateCategory, deleteCategory, getFullcategory } = require("../controllers/category");
const { get } = require("mongoose");

const categoryRouter = app.Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/get-categories", getCategories);
categoryRouter.get("/get-category/:id", getCategorybyId);
categoryRouter.put("/update-category/:id", updateCategory);
categoryRouter.delete("/delete-category/:id", deleteCategory);
categoryRouter.get("/get-full-category/:id", getFullcategory);

module.exports = categoryRouter;
