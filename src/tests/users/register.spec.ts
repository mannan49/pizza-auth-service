/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import request from "supertest";
import app from "../../app";

describe("POST /auth/register", () => {
  // Common user data for all test cases
  const userData = {
    firstName: "Rakesh",
    lastName: "K",
    email: "rakesh@mern.space",
    password: "secret",
  };

  describe("Given all fields", () => {
    it("should return the 201 status code", async () => {
      // Act
      const response = await request(app).post("/auth/register").send(userData);

      // Assert
      expect(response.statusCode).toBe(201);
    });

    it("should return valid json response", async () => {
      // Act
      const response = await request(app).post("/auth/register").send(userData);

      // Assert
      const contentType = response.headers["content-type"];
      expect(contentType).toEqual(expect.stringContaining("json"));
    });
  });

  describe("Fields are missing", () => {
    it("should return a 400 status code when the email is missing", async () => {
      // Arrange: Remove email from the userData
      const { email, ...userDataWithoutEmail } = userData;

      // Act
      const response = await request(app)
        .post("/auth/register")
        .send(userDataWithoutEmail);

      // Assert
      expect(response.statusCode).toBe(400); // Assuming 400 for missing fields
    });

    it("should return a 400 status code when the password is missing", async () => {
      // Arrange: Remove password from the userData
      const { password, ...userDataWithoutPassword } = userData;

      // Act
      const response = await request(app)
        .post("/auth/register")
        .send(userDataWithoutPassword);

      // Assert
      expect(response.statusCode).toBe(400); // Assuming 400 for missing fields
    });

    // Add further test cases for other missing fields (firstName, lastName, etc.)
  });
});
