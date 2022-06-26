import { checkSchema } from "express-validator";
import { Router } from "express";

import Routes from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import {
  loginBodySchema,
  signupBodySchema,
} from "../validators/auth.validator";

class AuthRoutes implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/signup",
      checkSchema(signupBodySchema),
      this.authController.postSignup
    );
    this.router.post(
      "/login",
      checkSchema(loginBodySchema),
      this.authController.postLogin
    );
  }
}

export default AuthRoutes;
