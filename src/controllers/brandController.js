const brandSchema = require("../models/brandSchema");

// Create Brand
const createBrand = (req, resp) => {
  const brand = new brandSchema({
    name: req.body.name,
    image: req.body.image,
  });
  brand
    .save()
    .then(() => {
      resp.status(201).json({ message: `Brand ${brand.name} created successfully!` });
    })
    .catch(error => {
      return resp.status(500).json(error);
    });
};

// Find One Brand
const findBrandById = (req, resp) => {
  brandSchema.findOne({ _id: req.params.id }).then(selectedObj => {
    if (selectedObj != null) {
      return resp.status(200).json(selectedObj);
    }
    return resp.status(404).json({ message: `Brand with Id ${req.params.id} Not Found!` });
  });
};

// Update Brand
const updateBrand = async (req, resp) => {
  const updateData = await brandSchema.findOneAndUpdate(
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
    resp.status(200).json({ message: `Brand Updated as ${req.body.name}` });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Brand
const deleteBrand = async (req, resp) => {
  const deleteData = await brandSchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "Brand Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Brands
const findAllBrands = (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    brandSchema
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

// Find all Brands Count
const findBrandCount = (req, resp) => {
  try {
    brandSchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBrand,
  findBrandById,
  updateBrand,
  deleteBrand,
  findAllBrands,
  findBrandCount,
};
