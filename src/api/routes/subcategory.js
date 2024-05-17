const Router = require("express").Router;

const {
    createSubCategory,
    getSubCategories,
    getSubCategorybyId,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoriesByCategoryId
    } = require("../controllers/subcategory");

const subCategoryRouter = Router();

subCategoryRouter.post("/create-sub-category", createSubCategory);
subCategoryRouter.get("/get-sub-categories", getSubCategories);
subCategoryRouter.get("/sub-category/:id", getSubCategorybyId);
subCategoryRouter.put("/update-sub-category/:id", updateSubCategory);
subCategoryRouter.delete("/delete-sub-category/:id", deleteSubCategory);
subCategoryRouter.get("/get-sub-categories-by-category/:id", getSubCategoriesByCategoryId);

module.exports = subCategoryRouter;
