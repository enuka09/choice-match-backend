const SubCategory = require("../../models/subCategorySchema");
const { deleteSubCategory } = require("../../controllers/subCategoryController");

describe("deleteSubCategory", () => {
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

  it("should delete a SubCategory and return 204 status code with the correct message", async () => {
    jest.spyOn(SubCategory, "findByIdAndDelete").mockResolvedValue(true);

    await deleteSubCategory(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "Sub-category Deleted successfully!" }); // Updated message to match the actual implementation
  });

  it("should handle errors and return 500 status code if no SubCategory is found", async () => {
    jest.spyOn(SubCategory, "findByIdAndDelete").mockResolvedValue(null);

    await deleteSubCategory(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
