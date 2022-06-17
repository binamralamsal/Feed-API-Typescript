import { checkSchema } from "express-validator";
import { Router } from "express";

import Routes from "../interfaces/routes.interface";
import FeedController from "../controllers/feed.controller";
import { postBodySchema } from "../validators/feed.validator";
import multer from "multer";
import path from "path";

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
    this.router.get("/posts", this.feedController.getPosts);
    this.router.post(
      "/post",
      upload.single("image"),
      checkSchema(postBodySchema),
      this.feedController.createPost
    );
    this.router.get("/post/:postId", this.feedController.getPost);
    this.router.put(
      "/post/:postId",
      upload.single("image"),
      checkSchema(postBodySchema),
      this.feedController.updatePost
    );
  }
}

export default FeedRoutes;
