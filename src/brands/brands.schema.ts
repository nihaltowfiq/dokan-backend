import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ collection: 'brands', timestamps: true })
export class Brand extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;

  @Prop({ type: String })
  logo: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
