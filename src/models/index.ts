import { getModelForClass } from "@typegoose/typegoose";
import UserSchema from "./user.model";
import PostSchema from "./post.model";

export const User = getModelForClass(UserSchema);
export const Post = getModelForClass(PostSchema);
