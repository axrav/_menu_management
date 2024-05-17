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
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // References to Category
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
  },
  taxNumber: {
    type: String,
  },
  taxType: {
    type: String,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }], // References to Item
});

subCategorySchema.pre('save', async function(next) {
  if (this.isNew) { // Only set defaults for new documents
    try {
      const category = await mongoose.model('Category').findById(this.categoryId);
      if (category) {
        this.taxApplicable = this.taxApplicable !== undefined ? this.taxApplicable : category.taxApplicable;
        this.taxNumber = this.taxNumber || category.taxNumber;
        this.taxType = this.taxType || category.taxType;
      } else {
        const error = new Error('Category not found');
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
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
