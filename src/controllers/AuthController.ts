import { NextFunction, Response } from "express";
import { RegisterUserRequest } from "../types";
import { UserService } from "../services/UserService";
import { Logger } from "winston";

export class AuthController {
  userService: UserService;
  logger: Logger;

  constructor(userService: UserService, logger: Logger) {
    this.userService = userService;
    this.logger = logger;
  }

  async register(req: RegisterUserRequest, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const createdUser = await this.userService.create({
        firstName,
        lastName,
        email,
        password,
      });
      this.logger.info(`User has been registered`, { id: createdUser.id });
      res.status(201).json({ id: createdUser.id });
    } catch (error) {
      next(error);
      return;
    }
  }
}
