import { Schema } from "express-validator";

const postBodySchema: Schema = {
  title: {
    trim: true,
    isLength: {
      options: {
        min: 5,
      },
    },
    errorMessage: "Invalid title, must be at least 5 characters long.",
  },
  content: {
    trim: true,
    isLength: {
      options: {
        min: 5,
      },
    },
    errorMessage: "Invalid content, must be at least 5 characters long.",
  },
};

export { postBodySchema };
