import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import Post from "../models/post.model";
import HttpException from "../exceptions/HttpException";

class FeedController {
  /**
   * @desc    Get all Posts
   * @route   GET /feed/posts
   * @access  Public
   */
  public async getPosts(req: Request, res: Response) {
    const posts = await Post.find({});
    res.status(200).json({ posts });
  }

  /**
   * @desc    Add new Posts
   * @route   POST /feed/post
   * @access  Public
   */
  public async createPost(req: Request, res: Response) {
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

    const { title, content, imageUrl } = req.body;
    const post = await Post.create({ title, content, imageUrl });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  }

  /**
   * @desc    Get specific post
   * @route   GET /feed/post/:postId
   * @access  Public
   */
  public async getPost(req: Request, res: Response) {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) throw new HttpException(404, "Post not found!");

    res.status(200).json(post);
  }
}

export default FeedController;
