import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/models/User";
import { initmongoose } from "@/lib/mongoose";

export default async function handle(req,res){
    await initmongoose();

    const session = await getServerSession(req,res,authOptions);
    const {bio,name,username} = req.body;
    await User.findByIdAndUpdate(session.user.id, {bio,name,username});
    res.json('ok');
}