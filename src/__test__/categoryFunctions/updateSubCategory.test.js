const SubCategory = require("../../models/subCategorySchema");
const { updateSubCategory } = require("../../controllers/subCategoryController");

describe("updateSubCategory", () => {
  const req = {
    params: { id: "123" },
    body: { name: "Updated Sub-category Name", image: "updated-image.jpg", mainCategory: "women" },
  };
  const resp = {
    status: jest.fn(() => resp),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the SubCategory and return 200", async () => {
    jest.spyOn(SubCategory, "findOneAndUpdate").mockResolvedValue({
      name: "Updated Name",
      mainCategory: "New=updated--image.jpg",
      image: "updated-image.jpg",
    });

    await updateSubCategory(req, resp);

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({ message: `Sub-category Updated as ${req.body.name}` });
  });

  it("should return 500 if no SubCategory is updated", async () => {
    jest.spyOn(SubCategory, "findOneAndUpdate").mockResolvedValue(null);

    await updateSubCategory(req, resp);

    expect(resp.status).toHaveBeenCalledWith(500);
    expect(resp.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
