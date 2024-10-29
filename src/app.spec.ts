import { multiplyTwoNumbers } from "./utils";

describe("App", () => {
  it("should multiply", () => {
    const product = multiplyTwoNumbers(3, 4);
    expect(product).toBe(12);
  });
});
