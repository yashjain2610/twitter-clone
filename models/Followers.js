import { model } from "mongoose";
const { Schema, default: mongoose, models } = require("mongoose");

const FollowerSchema = new Schema({
    source: {type: mongoose.Types.ObjectId, required: true},
    destination: {type: mongoose.Types.ObjectId,required:true},
})

const Follower = models?.Follower || model('Follower',FollowerSchema);

export default Follower;