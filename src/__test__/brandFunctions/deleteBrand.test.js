const Brand = require("../../models/brandSchema");
const { deleteBrand } = require("../../controllers/brandController");

describe("deleteBrand", () => {
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

  it("should delete a brand and return 204 status code", async () => {
    jest.spyOn(Brand, "findByIdAndDelete").mockResolvedValue(true);

    await deleteBrand(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "Brand Deleted successfully!" });
  });

  it("should handle errors and return 500 status code", async () => {
    jest.spyOn(Brand, "findByIdAndDelete").mockResolvedValue(null);

    await deleteBrand(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
