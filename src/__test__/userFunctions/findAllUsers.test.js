const { findAllUsers } = require("../../controllers/userController");
const userSchema = require("../../models/userSchema");

jest.mock("../../models/userSchema");

describe("findAllUsers", () => {
  let req, resp;

  beforeEach(() => {
    req = {
      query: {
        searchText: "",
        page: 1,
        size: 10,
      },
    };
    resp = {
      status: jest.fn(() => resp),
      json: jest.fn(),
      send: jest.fn(),
    };

    userSchema.find = jest.fn().mockReturnThis();
    userSchema.select = jest.fn().mockReturnThis();
    userSchema.limit = jest.fn().mockReturnThis();
    userSchema.skip = jest.fn().mockReturnThis();
    userSchema.then = jest.fn();
  });

  test("should retrieve all users successfully", async () => {
    const users = [
      { fullName: "Test User 1", email: "user1@test.com" },
      { fullName: "Test User 2", email: "user2@test.com" },
    ];
    userSchema.then.mockImplementationOnce(resolve => resolve(users));

    await findAllUsers(req, resp);

    expect(resp.json).toHaveBeenCalledWith(users);
    expect(resp.status).toHaveBeenCalledWith(200);
  });

  test("should handle errors during user retrieval", async () => {
    const errorMessage = "Internal Server Error";
    userSchema.then.mockImplementationOnce((resolve, reject) => reject(new Error(errorMessage)));

    await findAllUsers(req, resp);

    expect(resp.json).toHaveBeenCalledWith({ message: errorMessage });
    expect(resp.status).toHaveBeenCalledWith(500);
  });
});
