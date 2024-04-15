const mainCategorySchema = require("../models/mainCategorySchema");

// Create Main-Category
const createMainCategory = (req, resp) => {
  const mainCategory = new mainCategorySchema({
    name: req.body.name,
    image: req.body.image,
  });
  mainCategory
    .save()
    .then(() => {
      resp.status(201).json({ message: `Main category ${mainCategory.name} created successfully!` });
    })
    .catch(error => {
      return resp.status(500).json(error);
    });
};

// Find One Main-Category
const findMainCategoryById = (req, resp) => {
  mainCategorySchema.findOne({ _id: req.params.id }).then(selectedObj => {
    if (selectedObj != null) {
      return resp.status(200).json(selectedObj);
    }
    return resp.status(404).json({ message: `Main category with Id ${req.params.id} Not Found!` });
  });
};

// Update Main-Category
const updateMainCategory = async (req, resp) => {
  const updateData = await mainCategorySchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        image: req.body.image,
      },
    },
    { new: true },
  );
  if (updateData) {
    resp.status(200).json({ message: `Main category Updated as ${req.body.name}` });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Main-Category
const deleteMainCategory = async (req, resp) => {
  const deleteData = await mainCategorySchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "Main category Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Main-Categories
const findAllMainCategories = (req, resp) => {
  try {
    const { searchText } = req.query;

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    mainCategorySchema.find(query).then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Main-Categories Count
const findMainCategoryCount = (req, resp) => {
  try {
    mainCategorySchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createMainCategory,
  findMainCategoryById,
  updateMainCategory,
  deleteMainCategory,
  findAllMainCategories,
  findMainCategoryCount,
};
