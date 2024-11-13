import { multiplyTwoNumbers } from "./utils";

describe.skip("App", () => {
  it("should multiply", () => {
    const product = multiplyTwoNumbers(3, 4);
    expect(product).toBe(12);
  });
});
