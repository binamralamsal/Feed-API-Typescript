import { checkSchema } from "express-validator";
import { Router } from "express";

import Routes from "../interfaces/routes.interface";
import AuthController from "../controllers/auth.controller";
import { postBodySchema } from "../validators/feed.validator";

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
      checkSchema(postBodySchema),
      this.authController.postSignup
    );
  }
}

export default AuthRoutes;
