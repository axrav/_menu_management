const { SubCategory, Category } = require("../../database/model");

// sub category controllers

const createSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    const category = await Category.findById(req.body.categoryId);

    // saving the subcategory in category
    category.subCategories.push(subCategory._id);
    await category.save();

    return res.status(201).json(subCategory);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    return res.status(200).json(subCategories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSubCategorybyId = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    return res.status(200).json(subCategory);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    return res.status(200).json(subCategory);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    return res.status(200).json(subCategory);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ categoryId: req.params.id });
    return res.status(200).json(subCategories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategorybyId,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoriesByCategoryId,
};
