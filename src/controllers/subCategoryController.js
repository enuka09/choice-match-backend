const subCategorySchema = require("../models/subCategorySchema");
const mainCategorySchema = require("../models/mainCategorySchema");

// Create sub-Category
const createSubCategory = (req, resp) => {
  const subCategory = new subCategorySchema({
    name: req.body.name,
    mainCategory: req.body.mainCategory,
    image: req.body.image,
  });
  subCategory
    .save()
    .then(() => {
      resp.status(201).json({ message: `Sub-category ${subCategory.name} created successfully!` });
    })
    .catch(error => {
      return resp.status(500).json(error);
    });
};

// Find One sub-Category
const findSubCategoryById = (req, resp) => {
  subCategorySchema.findOne({ _id: req.params.id }).then(selectedObj => {
    if (selectedObj != null) {
      return resp.status(200).json(selectedObj);
    }
    return resp.status(404).json({ message: `Sub-category with Id ${req.params.id} Not Found!` });
  });
};

// Update sub-Category
const updateSubCategory = async (req, resp) => {
  const updateData = await subCategorySchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        mainCategory: req.body.mainCategory,
        image: req.body.image,
      },
    },
    { new: true },
  );
  if (updateData) {
    resp.status(200).json({ message: `Sub-category Updated as ${req.body.name}` });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Sub-Category
const deleteSubCategory = async (req, resp) => {
  const deleteData = await subCategorySchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "Sub-category Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Sub-Categories
const findAllSubCategories = (req, resp) => {
  try {
    subCategorySchema
      .find()
      .populate("mainCategory")
      .then(response => {
        return resp.status(200).json(response);
      });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Sub-Categories Count
const findSubCategoryCount = (req, resp) => {
  try {
    subCategorySchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find Sub-Category by Main Category
const findByMainCategoryName = async (req, res) => {
  try {
    const mainCategoryName = req.params.categoryName;
    const mainCategory = await mainCategorySchema.findOne({ name: mainCategoryName });

    if (!mainCategory) {
      return res.status(404).json({ message: "Main category not found" });
    }

    const subCategories = await subCategorySchema.find({ mainCategory: mainCategory._id });
    res.json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.toString() });
  }
};

module.exports = {
  createSubCategory,
  findSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  findAllSubCategories,
  findSubCategoryCount,
  findByMainCategoryName,
};
