const { userLogin } = require("../../controllers/userController");
const userSchema = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userSchema");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("userLogin", () => {
  const req = {
    body: {
      email: "testuser@test.com",
      password: "testPass",
    },
  };
  let resp;
  let originalConsoleLog;

  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = jest.fn();
    resp = {
      status: jest.fn(() => resp),
      send: jest.fn(),
      json: jest.fn(),
    };

    userSchema.findOne = jest.fn();
    bcrypt.compareSync = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  test("should login user successfully", async () => {
    userSchema.findOne.mockResolvedValue({
      _id: "123",
      email: "testuser@test.com",
      passwordHash: "hashedPassword",
      isAdmin: false,
    });
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign = jest.fn().mockReturnValue("fakeToken");

    await userLogin(req, resp);

    expect(resp.status).toHaveBeenCalledWith(200);
    expect(resp.send).toHaveBeenCalledWith({
      user: req.body.email,
      isAdmin: false,
      token: "fakeToken",
    });
  });

  test("should fail login if user not found", async () => {
    userSchema.findOne.mockResolvedValue(null);

    await userLogin(req, resp);

    expect(resp.status).toHaveBeenCalledWith(400);
    expect(resp.send).toHaveBeenCalledWith("User Not Found!");
  });

  test("should fail login if password does not match", async () => {
    userSchema.findOne.mockResolvedValue({
      _id: "123",
      email: "testuser@test.com",
      passwordHash: "hashedPassword",
      isAdmin: false,
    });
    bcrypt.compareSync.mockReturnValue(false);

    await userLogin(req, resp);

    expect(resp.status).toHaveBeenCalledWith(400);
    expect(resp.send).toHaveBeenCalledWith("Invalid Password!");
  });
});
