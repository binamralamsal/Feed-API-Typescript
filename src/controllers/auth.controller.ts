import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpException from "../exceptions/HttpException";
import User from "../models/user.model";

class AuthController {
  /**
   * @desc    Create a new user
   * @route   POST /auth/signup
   * @access  Public
   */
  public async postSignup(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(
        422,
        "Validation failed, entered data is incorrect",
        {
          errors: errors.array(),
        }
      );
    }

    const { email, name, password } = req.body;
    const user = await User.create({ email, name, password });

    res.status(201).json(user);
  }
}

export default AuthController;
