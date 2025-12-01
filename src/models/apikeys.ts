import { Document, Model, Schema, model } from 'mongoose';
import randomId from '../utils/random-id';

type APIKey = {
  keyId: string;
  label: string;
  hashKey: string;
  scopes?: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export interface APIKeyModel extends APIKey, Document {}

const APIKeySchema = new Schema<APIKeyModel>(
  {
    keyId: { type: String, unique: true, default: () => randomId(6) },
    label: { type: String, unique: true, required: true },
    hashKey: { type: String, unique: true, required: true },
    scopes: [
      {
        type: String,
      },
    ],
    createdBy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export interface APIKeyStatic extends Model<APIKeyModel> {}

const APIKeys = model<APIKeyModel, APIKeyStatic>('APIKey', APIKeySchema);
export default APIKeys;
