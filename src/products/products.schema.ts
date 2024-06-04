import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  product_id: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop({ type: String })
  main_image: string;

  @Prop()
  description: string;

  @Prop()
  specification: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Review' }] })
  reviews: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Types.ObjectId[];

  @Prop()
  variants: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
  brand: Types.ObjectId;

  @Prop({ required: true })
  price: number;

  @Prop()
  discount_price: number;

  @Prop({ required: true })
  sku: string;

  @Prop({ default: false })
  has_discount_price: boolean;

  @Prop({ required: true })
  current_stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
