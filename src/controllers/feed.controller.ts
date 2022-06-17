import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

class FeedController {
  /**
   * @desc    Get all Posts
   * @route   GET /feed/posts
   * @access  Public
   */
  public getPosts(req: Request, res: Response) {
    res.status(200).json({
      posts: [{ title: "First Post", content: "This is the first post!" }],
    });
  }

  /**
   * @desc    Add new Posts
   * @route   POST /feed/posts
   * @access  Public
   */
  public createPost(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, entered data is incorrect.",
        errors: errors.array(),
      });
    }

    const { title, content } = req.body;

    res.status(201).json({
      message: "Post created successfully",
      post: {
        id: new Date().toISOString(),
        title,
        content,
      },
    });
  }
}

export default FeedController;
