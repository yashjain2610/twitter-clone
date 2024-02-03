import { initmongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Post from "@/models/Posts";
import User from "@/models/User";
import Like from "@/models/Like";
import Follower from "@/models/Followers";

export default async function handler(req,res){
    await initmongoose();
    const session = await getServerSession(req,res,authOptions);

    if(req.method === 'POST'){
        const {text,parent} = req.body;
        await Post.create({
            author:session.user.id,
                text,
                parent,
        });
        if(parent){
            const parentPost = await Post.findById(parent);
            parentPost.commentsCount = await Post.countDocuments({parent});
            await parentPost.save();
        }
        res.json('post');
    }
    if(req.method === 'GET'){
        const {id} = req.query;
        if(id){
            const post = await Post.findById(id).populate({path: 'author', model: User,}).populate({path: 'parent', populate: 'author'});
            res.json({post});
        }
        else{
            const parent = req.query.parent || null;
            const author = req.query.author;
            let searchFilter = author ? {author} : {parent};
            if(!author && !parent){
                const myFollows = await Follower.find({source:session.user.id}).exec();
                const idsIfollow = myFollows.map(f => f.destination);
                searchFilter = {author: [...idsIfollow,session.user.id]};
            }
            const posts = await Post.find(searchFilter).populate({path: 'author', model: User,}).populate({path: 'parent',populate: 'author'}).sort({createdAt: -1}).limit(20).exec();
            const postLikedByMe = await Like.find({
                author: session?.user.id,
                post:posts.map(p => p._id),
            })
            const idsLikedByMe = postLikedByMe.map(like => like.post);
            res.json({
                posts,
                idsLikedByMe,
            });
        }
    }

}