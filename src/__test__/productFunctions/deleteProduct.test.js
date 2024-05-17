const Product = require("../../models/productSchema");
const { deleteProduct } = require("../../controllers/productController");

describe("deleteProduct", () => {
  const mockSend = jest.fn();
  const mockStatus = jest.fn().mockImplementation(status => {
    return { json: mockSend, status };
  });
  const req = {
    params: { id: "123" },
  };
  const resp = { status: mockStatus, json: mockSend };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a Product and return 204 status code with the correct message", async () => {
    jest.spyOn(Product, "findByIdAndDelete").mockResolvedValue(true);

    await deleteProduct(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "Product Deleted successfully!" });
  });

  it("should handle errors and return 500 status code if no Product is found", async () => {
    jest.spyOn(Product, "findByIdAndDelete").mockResolvedValue(null);

    await deleteProduct(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
