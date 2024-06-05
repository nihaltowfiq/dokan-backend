import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true, type: String })
  product_id: string;

  @Prop({ required: true, type: String })
  slug: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: String, required: true })
  main_image: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discount_price: number;

  @Prop({ required: true })
  sku: string;

  @Prop({ default: false })
  has_discount_price: boolean;

  @Prop({ required: true, default: 10 })
  current_stock: number;

  @Prop()
  specification: string;

  @Prop({ type: [String] })
  variants: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Review' }] })
  reviews: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
