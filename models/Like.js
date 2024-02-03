const { Schema, default: mongoose, model, models } = require("mongoose");

const LikeSchema = new Schema({
    author: {type: mongoose.Types.ObjectId, ref: 'user'},
    post: {type:mongoose.Types.ObjectId, ref: 'posts'},
}, {
    timestamps: true,
});

const Like = models?.Like || model('Like',LikeSchema);

export default Like;