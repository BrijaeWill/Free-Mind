import mongoose, { Schema } from "mongoose";

const blacklistTokenSchema = new Schema({
    token:{
        type: String,
        required: true
    },
    createdAt:{type:Date,expires:"1h",default:Date.now}
}

);

export const blacklistedToken = mongoose.model("blacklististedToken",blacklistTokenSchema);