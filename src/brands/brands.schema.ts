import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ collection: 'brands', timestamps: true })
export class Brand extends Document {}

export const BrandSchema = SchemaFactory.createForClass(Brand);
