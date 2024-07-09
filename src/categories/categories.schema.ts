import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
class Child {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ type: [Types.ObjectId], ref: 'Child' })
  child: Child[] | null;
}

const ChildSchema = SchemaFactory.createForClass(Child);

@Schema({ collection: 'categories', timestamps: true })
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ type: [ChildSchema], default: [] })
  child: Child[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
