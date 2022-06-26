import { DocumentType } from "@typegoose/typegoose";
import { UserClass } from "../models/user.model";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: DocumentType<UserClass>;
    }
  }
}
