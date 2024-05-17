const User = require("../../models/userSchema");
const { deleteUser } = require("../../controllers/userController");

describe("deleteUser", () => {
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

  it("should delete a user and return 204 status code", async () => {
    jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(true);

    await deleteUser(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "User Deleted successfully!" });
  });

  it("should handle errors and return 500 status code", async () => {
    jest.spyOn(User, "findByIdAndDelete").mockResolvedValue(null);

    await deleteUser(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
