/* eslint-disable @typescript-eslint/no-unused-vars */

import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types";
import createHttpError from "http-errors";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async create({ firstName, lastName, email, password }: UserData) {
    try {
      return await this.userRepository.save({
        firstName,
        lastName,
        email,
        password,
      });
    } catch (err) {
      const error = createHttpError(
        500,
        "Failed to strore teh data in the database",
      );
      throw error;
    }
  }
}
