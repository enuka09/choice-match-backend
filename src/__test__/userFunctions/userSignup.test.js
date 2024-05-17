const { userRegister } = require("../../controllers/userController");
const userSchema = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

jest.mock("../../models/userSchema");
jest.mock("bcryptjs");
jest.mock("nodemailer");

describe("userRegister", () => {
  const req = {
    body: {
      fullName: "Test User",
      email: "testuser@test.com",
      password: "testPass",
      phone: "0123456789",
      dob: "2002-10-11",
      gender: "Male",
      isAdmin: false,
      activeState: true,
    },
  };
  let resp;
  let transporterMock;
  let originalConsoleError;
  let originalConsoleLog;

  beforeEach(() => {
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    console.error = jest.fn();
    console.log = jest.fn();

    resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
      send: jest.fn(),
    };
    transporterMock = {
      sendMail: jest.fn().mockResolvedValue(true),
    };
    nodemailer.createTransport.mockReturnValue(transporterMock);
    bcrypt.hashSync.mockReturnValue("hashedPassword");
    userSchema.mockClear();
    userSchema.prototype.save = jest.fn().mockResolvedValue(req.body);
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  test("should register a user successfully", async () => {
    await userRegister(req, resp);

    expect(resp.status).toHaveBeenCalledWith(201);
    expect(resp.json).toHaveBeenCalledWith({
      message: "User registered successfully!",
    });
    expect(userSchema.prototype.save).toHaveBeenCalled();
    expect(nodemailer.createTransport).toHaveBeenCalled();
    expect(transporterMock.sendMail).toHaveBeenCalled();
  });

  test("should handle registration errors", async () => {
    userSchema.prototype.save = jest.fn().mockRejectedValue(new Error("Failed to save"));

    await userRegister(req, resp);

    expect(resp.status).toHaveBeenCalledWith(500);
    expect(resp.json).toHaveBeenCalledWith({ error: "Failed to save" });
  });
});
