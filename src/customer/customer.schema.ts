import { Address } from '@/address/address.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true, type: String, unique: true })
  customer_id: string;

  @Prop({ required: true, type: String })
  first_name: string;

  @Prop({ required: true, type: String })
  last_name: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  phone: string;

  @Prop({ required: false, type: String, default: null })
  avatar_url: string;

  @Prop({ required: false, type: String, default: null })
  date_of_birth: string;

  @Prop({ required: false, type: String, default: null })
  gender: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    default: null,
  })
  addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
