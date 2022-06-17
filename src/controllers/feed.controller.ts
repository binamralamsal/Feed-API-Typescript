import fs from "fs";
import path from "path";
import { Request, Response } from "express";

import { validationResult } from "express-validator";
import Post from "../models/post.model";
import HttpException from "../exceptions/HttpException";

const clearImage = (imagePath: string) => {
  fs.unlink(imagePath, (error) => {
    throw error;
  });
};

class FeedController {
  /**
   * @desc    Get all Posts
   * @route   GET /feed/posts
   * @access  Public
   */
  public async getPosts(req: Request, res: Response) {
    const currentPage = +(req.query.page || 1);
    const perPage = 5;
    const totalItems = await Post.countDocuments();

    const posts = await Post.find({})
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({
      hasPrevious: currentPage > 1,
      hasNext: currentPage < Math.ceil(totalItems / perPage),
      posts,
      totalItems,
      currentPage,
    });
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

    if (!req.file) throw new HttpException(422, "No image provided");

    const imageUrl = req.file.path;
    const { title, content } = req.body;
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

  /**
   * @desc    Update specific post
   * @route   PUT /feed/post/:postId
   * @access  Public
   */
  public async updatePost(req: Request, res: Response) {
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

    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) throw new HttpException(404, "Post not found!");
    if (!req.file) throw new HttpException(422, "No image provided");

    if (req.file.path !== post.imageUrl) {
      clearImage(post.imageUrl);
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.imageUrl = req.file.path;
    await post.save();
  }

  /**
   * @desc    Delete specific post
   * @route   DELETE /post/:postId
   * @access  Public
   */
  public async deletePost(req: Request, res: Response) {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) throw new HttpException(404, "Post not found!");

    clearImage(post.imageUrl);
    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  }
}

export default FeedController;
