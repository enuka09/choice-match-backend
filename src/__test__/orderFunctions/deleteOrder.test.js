const Order = require("../../models/orderSchema");
const { deleteOrder } = require("../../controllers/orderController");

describe("deleteOrder", () => {
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

  it("should delete a Order and return 204 status code with the correct message", async () => {
    jest.spyOn(Order, "findByIdAndDelete").mockResolvedValue(true);

    await deleteOrder(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(204);
    expect(mockSend).toHaveBeenCalledWith({ message: "Order Deleted successfully!" });
  });

  it("should handle errors and return 500 status code if no Order is found", async () => {
    jest.spyOn(Order, "findByIdAndDelete").mockResolvedValue(null);

    await deleteOrder(req, resp);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
