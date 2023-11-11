import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    inviteID: string;
    discordLink: string | null;
    isDiscordUsed: boolean;
}

const UserSchema: Schema = new Schema({
    inviteID: { type: String, required: true },
    discordLink: { type: String, required: true },
    isDiscordUsed: { type: Boolean, required: true }
});

export default mongoose.model<IUser>("Users", UserSchema);