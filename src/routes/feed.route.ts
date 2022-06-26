import { checkSchema } from "express-validator";
import { Router } from "express";

import Routes from "../interfaces/routes.interface";
import FeedController from "../controllers/feed.controller";
import { postBodySchema } from "../validators/feed.validator";
import multer from "multer";
import path from "path";
import { authMiddleware } from "../middlewares/auth.middleware";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "data", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
      return cb(null, true);

    return cb(null, false);
  },
});

class FeedRoutes implements Routes {
  public path = "/feed";
  public router = Router();
  public feedController = new FeedController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/posts", authMiddleware, this.feedController.getPosts);
    this.router.post(
      "/post",
      authMiddleware,
      checkSchema(postBodySchema),
      upload.single("image"),
      this.feedController.createPost
    );
    this.router.get(
      "/post/:postId",
      authMiddleware,
      this.feedController.getPost
    );
    this.router.put(
      "/post/:postId",
      authMiddleware,
      checkSchema(postBodySchema),
      upload.single("image"),
      this.feedController.updatePost
    );
    this.router.delete(
      "/post/:postId",
      authMiddleware,
      this.feedController.deletePost
    );
  }
}

export default FeedRoutes;
