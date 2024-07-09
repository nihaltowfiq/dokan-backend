import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ collection: 'admins', timestamps: true })
export class Admin extends Document {
  @Prop({ type: String })
  name: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: false, type: String, default: null })
  avatar_url: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
