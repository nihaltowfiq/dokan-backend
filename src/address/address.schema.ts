import { Customer } from '@/customer/customer.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ required: true, type: String })
  full_name: string;

  @Prop({ required: true, type: String })
  street_address: string;

  @Prop({ required: true, type: String })
  district: string;

  @Prop({ required: true, type: String })
  area: string;

  @Prop({ required: false, type: String, default: '' })
  notes: string;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({ required: true, type: String })
  phone_number: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Customer',
    default: null,
  })
  customer: Customer;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
