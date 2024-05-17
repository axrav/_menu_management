const { mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  taxApplicable: {
    type: Boolean,
    required: true,
  },
  taxNumber: {
    type: String,
    required: function () {
      return this.taxApplicable;
    },
  },
  taxType: {
    type: String,
    required: true,
  },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }], // References to SubCategory
});

const subCategorySchema = mongoose.Schema({
  categoryId: { type : mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // References to Category
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  taxApplicable: {
    type: Boolean,
    required: true,
  },
  taxNumber: {
    type: String,
    required: function () {
      return this.taxApplicable;
    },
  },
  taxType: {
    type: String,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // References to Item
});

const itemSchema = mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "parentModel",
    required: true,
  },
  parentModel: {
    type: String,
    required: true,
    enum: ["Category", "SubCategory"],
  }, // Dynamic reference
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  taxApplicable: {
    type: Boolean,
    required: true,
  },
  taxNumber: {
    type: String,
    required: function () {
      return this.taxApplicable;
    },
  },
  baseAmount: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    validate: {
      validator: function () {
        return this.totalAmount === this.baseAmount - this.discount;
      },
      message: "Total amount should be equal to base amount minus discount.",
    },
  },
});

const Category = mongoose.model("Category", categorySchema);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
const Item = mongoose.model("Item", itemSchema);


module.exports = { Category, SubCategory, Item };
