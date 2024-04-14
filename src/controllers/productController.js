const productSchema = require("../models/productSchema");

// Create Product
const createProduct = (req, resp) => {
  const product = new productSchema({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    unitPrice: req.body.unitPrice,
    mainCategory: req.body.mainCategory,
    subCategory: req.body.subCategory,
    brand: req.body.brand,
    color: req.body.color,
    size: req.body.size,
    qtyOnHand: req.body.qtyOnHand,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  });
  product
    .save()
    .then(() => {
      resp.status(201).json({ message: `Product ${product.name} created successfully!` });
    })
    .catch(error => {
      return resp.status(500).json(error);
    });
};

// Find One Product
const findProductById = (req, resp) => {
  productSchema.findOne({ _id: req.params.id }).then(selectedObj => {
    if (selectedObj != null) {
      return resp.status(200).json(selectedObj);
    }
    return resp.status(404).json({ message: `Product with Id ${req.params.id} Not Found!` });
  });
};

// Update Product
const updateProduct = async (req, resp) => {
  const updateData = await productSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        unitPrice: req.body.unitPrice,
        mainCategory: req.body.mainCategory,
        subCategory: req.body.subCategory,
        brand: req.body.brand,
        color: req.body.color,
        size: req.body.size,
        qtyOnHand: req.body.qtyOnHand,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
      },
    },
    { new: true },
  );
  if (updateData) {
    resp.status(200).json({ message: `Product Updated as ${req.body.name}` });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Product
const deleteProduct = async (req, resp) => {
  const deleteData = await productSchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "Product Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all products
const findAllProducts = (req, resp) => {
  try {
    const { searchText, color, size: productSize, mainCategory, subCategory, brand, minPrice, maxPrice } = req.query;

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }
    if (color) {
      query.color = { $in: color.split(",") };
    }
    if (productSize) {
      query.size = { $in: productSize.split(",") };
    }
    if (mainCategory) {
      query.mainCategory = mainCategory;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }
    if (brand) {
      query.brand = brand;
    }
    if (minPrice && maxPrice) {
      query.unitPrice = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.unitPrice = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.unitPrice = { $lte: parseFloat(maxPrice) };
    }

    productSchema.find(query).then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Products Count
const findProductCount = (req, resp) => {
  try {
    productSchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find All Min Quantity Products
const findAllMin = (req, resp) => {
  try {
    productSchema.find({ qtyOnHand: { $lt: 10 } }).then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find All Featured
const findAllFeaturedProducts = (req, resp) => {
  try {
    productSchema.find({ isFeatured: true }).then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  findProductById,
  updateProduct,
  deleteProduct,
  findAllProducts,
  findProductCount,
  findAllMin,
  findAllFeaturedProducts,
};
