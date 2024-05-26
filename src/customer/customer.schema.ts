import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true, type: String, unique: true })
  customer_id: string;

  @Prop({ required: true, type: String })
  first_name: number;

  @Prop({ required: true, type: String })
  last_name: number;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  phone: string;

  @Prop({ required: false, type: String, default: null })
  address: string;

  @Prop({ required: false, type: String, default: null })
  avatar_url: string;

  @Prop({ required: false, type: String, default: null })
  date_of_birth: string;

  @Prop({ required: false, type: String, default: null })
  gender: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
