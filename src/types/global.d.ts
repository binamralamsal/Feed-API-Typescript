import { DocumentType } from "@typegoose/typegoose";
import UserSchema from "../models/user.model";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: DocumentType<UserSchema>;
    }
  }
}
