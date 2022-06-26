import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpException from "../exceptions/HttpException";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

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

    const token = generateToken({
      email: user.email,
      _id: user._id.toString(),
    });

    res.status(201).json({ token, userId: user._id.toString() });
  }

  /**
   * @desc    Login the user
   * @route   POST /auth/login
   * @access  Public
   */
  public async postLogin(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(
        401,
        "Validation failed, entered data is incorrect",
        {
          errors: errors.array(),
        }
      );
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      throw new HttpException(401, "Invalid email or password");

    const token = generateToken({
      email: user.email,
      _id: user._id.toString(),
    });

    res.status(200).json({ token, userId: user._id.toString() });
  }
}

export default AuthController;
