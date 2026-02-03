import mongoose, { Document, Schema } from 'mongoose';

/**
 * User Interface
 */
export interface IUser extends Document {
  googleId: string;
  email: string;
  name: string;
  picture: string;
  givenName?: string;
  familyName?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Schema
 */
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    givenName: {
      type: String,
    },
    familyName: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create indexes for better query performance (unique: true already creates index, so we don't need duplicate)
// Only add additional indexes if needed for compound queries

export const User = mongoose.model<IUser>('User', UserSchema);

