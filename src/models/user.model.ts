import {
  DocumentType,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import PostSchema from "./post.model";
import mongoose from "mongoose";

@pre<UserSchema>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
})
@modelOptions({
  options: {
    customName: "User",
  },
})
export default class UserSchema {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, default: "I am new" })
  public status!: string;

  @prop({ ref: () => PostSchema, default: [], required: true })
  public posts!: mongoose.Types.Array<Ref<PostSchema>>;

  @prop()
  public resetToken?: string;

  @prop({ type: () => Date })
  public resetTokenExpiration?: Date;

  public async comparePassword(
    this: DocumentType<UserSchema>,
    password: string
  ) {
    return await bcrypt.compare(password, this.password);
  }

  public async updatePassword(
    this: DocumentType<UserSchema>,
    password: string
  ) {
    this.password = password;
    this.resetToken = undefined;
    this.resetTokenExpiration = undefined;
    await this.save();
  }
}
