const mongoose = require("mongoose");
const { findUserById } = require("../../controllers/userController");
const User = require("../../models/userSchema");

const userData = {
  _id: new mongoose.Types.ObjectId("66311a87d0e5cc6e7b7bb0c0"),
  fullName: "test name",
  email: "testmail.com",
  passwordHash: "$2a$10$Kmh1HvLR5wL4zVfMX.T9gOW11mwijkV.XqlSsHn2O9l8wrEEGOnIa",
  phone: 1234567890,
  dob: "2008-05-14",
  gender: "Male",
  isAdmin: false,
  activeState: true,
};

describe("findUserById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a user without passwordHash if user exists", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue(userData),
    });

    const req = { params: { id: "5f785989e8421c13d422f934" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const resp = { status };

    await findUserById(req, resp);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: userData.fullName,
        email: userData.email,
      }),
    );
  });

  it("should return 404 if user does not exist", async () => {
    jest.spyOn(User, "findOne").mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    const req = { params: { id: "non_existing_id" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const resp = { status };

    await findUserById(req, resp);

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({ message: "User with Id non_existing_id Not Found!" });
  });

  it("should return 500 if there is a server error", async () => {
    jest.spyOn(User, "findOne").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const req = { params: { id: "any_id" } };
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const resp = { status };

    await findUserById(req, resp);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
