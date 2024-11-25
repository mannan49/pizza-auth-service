/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */

import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { truncateTables } from "../utils";
import { User } from "../../entity/User";
import { App } from "supertest/types";

describe("POST /auth/register", () => {
  let connection: DataSource;
  const userData = {
    firstName: "Rakesh",
    lastName: "K",
    email: "rakesh@mern.space",
    password: "secret",
  };

  beforeAll(async () => {
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    await truncateTables(connection);
  });

  afterAll(async () => {
    if (connection) {
      await connection.destroy();
    }
  });

  describe("Given all fields", () => {
    it("should return the 201 status code", async () => {
      const response = await request(app as unknown as App)
        .post("/auth/register")
        .send(userData);
      expect(response.statusCode).toBe(201);
    });

    it("should return a valid JSON response", async () => {
      const response = await request(app as unknown as App)
        .post("/auth/register")
        .send(userData);
      const contentType = response.headers["content-type"];
      expect(contentType).toEqual(expect.stringContaining("json"));
    });
    it("should persist the user in the database", async () => {
      await request(app as unknown as App)
        .post("/auth/register")
        .send(userData);
      const userRepository = connection.getRepository(User);
      const users = await userRepository.find();
      expect(users).toHaveLength(1);
      expect(users[0].firstName).toBe(userData.firstName);
      expect(users[0].lastName).toBe(userData.lastName);
      expect(users[0].email).toBe(userData.email);
    });
    it("should return an id of the created user", async () => {
      const response = await request(app as unknown as App)
        .post("/auth/register")
        .send(userData);
      expect(typeof response.body.id).toBe("number");
    });
  });

  describe("Fields are missing", () => {});
});
