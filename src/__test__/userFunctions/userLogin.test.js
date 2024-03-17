const userSchema = require("../../models/userSchema");
const userController = require("../../controllers/userController");
require("dotenv").config();

// process.env.SECRET_KEY = "your_secret_key_here";

describe("User Login", () => {
  it("should login a user with correct credentials", async () => {
    const req = {
      body: {
        email: "kamal@gmail.com",
        password: "Kamal_@1998",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockUser = {
      email: "kamal@gmail.com",
      passwordHash: "$2a$10$gcnGPU5NAmZ16qW7LERxKu3.H92hD3XGkWLuQV2gW6OWYt2vJ2PCC", // Hashed "testPass_123"
    };

    userSchema.findOne = jest.fn().mockResolvedValue(mockUser);

    await userController.userLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      user: "kamal@gmail.com",
      token: expect.any(String),
    });
  });

  it("should fail to login with incorrect password", async () => {
    const req = {
      body: {
        email: "kamal@gmail.com",
        password: "invalidPassword",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userSchema.findOne = jest.fn().mockResolvedValue(null);

    await userController.userLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("User Not Found!");
  });
});
