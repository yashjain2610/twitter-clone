import { initmongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import Follower from "@/models/Followers";

export default async function handle(req,res){
    await initmongoose();
    const session = await getServerSession(req,res,authOptions);
    const {destination} = req.body;

    const existingFollow = await Follower.findOne({destination,source: session.user.id});
    if(existingFollow){
        await Follower.deleteOne(existingFollow);
        res.json(null);
    }
    else{
        const f = await Follower.create({destination,source: session.user.id});
        res.json(f);
    }

}