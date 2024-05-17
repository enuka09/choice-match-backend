const Brand = require("../../models/brandSchema");
const { updateBrand } = require("../../controllers/brandController");

describe("updateBrand", () => {
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

  it("should update the brand and return 200", async () => {
    jest.spyOn(Brand, "findOneAndUpdate").mockResolvedValue({ name: "Updated Name", image: "updated-image.jpg" });

    await updateBrand(req, resp);

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.json).toHaveBeenCalledWith({ message: `Brand Updated as ${req.body.name}` });
  });

  it("should return 500 if no brand is updated", async () => {
    jest.spyOn(Brand, "findOneAndUpdate").mockResolvedValue(null);

    await updateBrand(req, resp);

    expect(resp.status).toHaveBeenCalledWith(500);
    expect(resp.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
