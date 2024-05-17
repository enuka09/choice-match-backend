const Category = require("../../models/mainCategorySchema");
const { deleteMainCategory } = require("../../controllers/mainCategoryController");

describe("deleteMainCategory", () => {
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

  it("should delete a Category and return 204 status code with the correct message", async () => {
    jest.spyOn(Category, "findByIdAndDelete").mockResolvedValue(true);

    await deleteMainCategory(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "Main category Deleted successfully!" });
  });

  it("should handle errors and return 500 status code if no category is found", async () => {
    jest.spyOn(Category, "findByIdAndDelete").mockResolvedValue(null);

    await deleteMainCategory(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
