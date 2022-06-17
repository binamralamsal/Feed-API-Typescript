import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: "Post",
  },
})
export class PostSchema {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public imageUrl!: string;

  @prop({ required: true })
  public content!: string;

  @prop({ required: true })
  public creator!: string;
}

export default getModelForClass(PostSchema);
