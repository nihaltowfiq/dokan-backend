import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true, type: Number, unique: true })
  customer_id: number;

  @Prop({ required: true, type: String })
  first_name: number;

  @Prop({ required: true, type: String })
  last_name: number;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  phone: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: false, type: String })
  avatar_url: string;

  @Prop({ required: false, type: String })
  date_of_birth: string;

  @Prop({ required: false, type: String })
  gender: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
