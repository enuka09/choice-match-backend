const subCategorySchema = require("../models/subCategorySchema");

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
    const { searchText, page = 1, size = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    subCategorySchema
      .find(query)
      .limit(pageSize)
      .skip(skip)
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

module.exports = {
  createSubCategory,
  findSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  findAllSubCategories,
  findSubCategoryCount,
};
