import { Schema } from "express-validator";
import { User } from "../models";

const signupBodySchema: Schema = {
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Please enter a valid email",
    custom: {
      options: async (value) => {
        const user = await User.findOne({ email: value });
        if (user) return Promise.reject("Email already exists");
      },
    },
  },
  password: {
    trim: true,
    isLength: {
      options: {
        min: 6,
      },
    },
    errorMessage: "Password must be at least 6 characters long",
  },
  name: {
    trim: true,
    isLength: {
      options: {
        min: 3,
      },
    },
    errorMessage: "Please enter valid name",
  },
};

const loginBodySchema: Schema = {
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Please enter a valid email",
  },
  password: {
    trim: true,
    isLength: {
      options: {
        min: 6,
      },
    },
    errorMessage: "Password must be at least 6 characters long",
  },
};

export { signupBodySchema, loginBodySchema };
