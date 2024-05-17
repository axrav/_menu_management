const { model } = require('mongoose');
const {Category} = require('../../database/model');

const createCategory = async (req , res) => {
    try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getCategories = async (req , res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const getCategorybyId = async (req , res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const updateCategory = async (req , res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteCategory = async (req , res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}




// get populated category 
const getFullcategory = async (req,res) => {
    try {
        const category = await Category.findById(req.params.id).populate({
            path: 'subCategories',
            model : 'SubCategory',
            match: { taxApplicable: true },
            populate: {
                path: 'items',
                model: 'Item'
            }
        });
        return res.status(200).json(category);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategorybyId,
    updateCategory,
    deleteCategory,
    getFullcategory
}