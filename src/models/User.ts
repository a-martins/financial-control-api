import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    createdAt: Date
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IUser>('User', UserSchema)