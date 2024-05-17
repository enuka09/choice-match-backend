const Product = require("../../models/productSchema");
const { updateProduct } = require("../../controllers/productController");

describe("updateProduct", () => {
  const req = {
    params: { id: "123" },
    body: {
      name: "New Product Name",
      image: "new-image.jpg",
      description: "Updated description",
      unitPrice: 100.99,
      mainCategory: "Women",
      subCategory: "Casual",
      brand: "Deedat",
      color: ["Black", "Blue"],
      size: ["M", "L"],
      qtyOnHand: 50,
      isFeatured: true,
      dateCreated: "2022-01-01",
    },
  };
  const resp = {
    status: jest.fn(() => resp),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the product and return 200", async () => {
    jest.spyOn(Product, "findOneAndUpdate").mockResolvedValue({
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

    await updateProduct(req, resp);

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({ message: `Product Updated as ${req.body.name}` });
  });

  it("should return 500 if no product is updated", async () => {
    jest.spyOn(Product, "findOneAndUpdate").mockResolvedValue(null);

    await updateProduct(req, resp);

    expect(resp.status).toHaveBeenCalledWith(500);
    expect(resp.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
