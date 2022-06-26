import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import UserSchema from "./user.model";

@modelOptions({
  options: {
    customName: "Post",
  },
})
export default class PostSchema {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public imageUrl!: string;

  @prop({ required: true })
  public content!: string;

  @prop({ ref: () => UserSchema, required: true })
  public creator!: Ref<UserSchema>;
}
