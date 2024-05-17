const Category = require("../../models/mainCategorySchema");
const { updateMainCategory } = require("../../controllers/mainCategoryController");

describe("updateCategory", () => {
  const req = {
    params: { id: "123" },
    body: { name: "Updated Name", image: "updated-image.jpg" },
  };
  const resp = {
    status: jest.fn(() => resp),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the category and return 200", async () => {
    jest.spyOn(Category, "findOneAndUpdate").mockResolvedValue({
      name: "Updated Name",
      image: "updated-image.jpg",
    });

    await updateMainCategory(req, resp);

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({ message: `Main category Updated as ${req.body.name}` });
  });

  it("should return 500 if no category is updated", async () => {
    jest.spyOn(Category, "findOneAndUpdate").mockResolvedValue(null);

    await updateMainCategory(req, resp);

    expect(resp.status).toHaveBeenCalledWith(500);
    expect(resp.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
