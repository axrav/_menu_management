const ParentModel = require("../../utils/utils");
const { Item, SubCategory } = require("../../database/model");

// item controllers
const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      name: req.body.name,
      parentId: req.body.subCategoryId,
      parentModel: ParentModel.SubCategory,
      description: req.body.description,
      image: req.body.image,
      taxApplicable: req.body.taxApplicable,
      taxNumber: req.body.taxNumber,
      taxType: req.body.taxType,
      baseAmount: req.body.baseAmount,
      discount: req.body.discount,
      totalAmount: req.body.baseAmount - req.body.discount,
    });

    const subCategory = await SubCategory.findById(req.body.subCategoryId);
    // saving the item in sub category
    subCategory.items.push(item._id);
    await subCategory.save();
    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getItembyId = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getItemsBySubCategoryId = async (req, res) => {
  try {
    const items = await Item.find({
      parentId: req.params.id,
      parentModel: ParentModel.SubCategory,
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getItemsByCategoryId = async (req, res) => {
  try {
    // find the sub category in which item exists
    const subCategory = await SubCategory.find({ categoryId: req.params.id });
    const items = await Item.find({
      parentId: { $in: subCategory.map((sub) => sub._id) },
      parentModel: ParentModel.SubCategory,
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// search with regex pattern by param , query can also be used
const searchItems = async (req, res) => {
  try {
    const items = await Item.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItembyId,
  updateItem,
  deleteItem,
  getItemsBySubCategoryId,
  getItemsByCategoryId,
  searchItems,
};
