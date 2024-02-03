import Layout from "@/components/Layout";
import PostContent from "@/components/PostContent";
import PostForm from "@/components/PostForm";
import TopArrow from "@/components/TopArrow";
import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage(){
    const router = useRouter();
    const {id} = router.query;
    const [post,setPost] = useState();
    const {userInfo} = useUserInfo();
    const [replies,setReplies] = useState([]);
    const [repliesLikedByMe,setRepliesLikedByMe] = useState([]);

    function fetchData(){
        if(!id){
            return;
        }

        axios.get('/api/posts?id='+id).then(response => {
            setPost(response.data.post);
        })
        axios.get('/api/posts?parent='+id).then(response => {
            setReplies(response.data.posts);
            setRepliesLikedByMe(response.data.idsLikedByMe);
        })
    }

    useEffect(() => {
        fetchData();
    },[id])
    return (
        <Layout>
            {!!post?._id && (
                <div className="px-5 py-2">
                    <TopArrow/>
                    {post.parent && (
                        <div className="pb-1">
                            <PostContent {...post.parent} />
                            <div className="h-12 border-l border-twitterBorder ml-5"></div>
                        </div>
                    )}
                    <PostContent {...post} big/>
                </div>
            )}
            {!!userInfo && (
                <div className="border-b border-twitterBorder py-5">
                    <PostForm onPost={() => {
                        fetchData()
                    }} compact parent={id} placeholder="Post your reply"/>
                </div>
            )}
            <div>
                {replies.length > 0 && replies.map(reply => (
                    <div className="p-5 border-t border-twitterBorder">
                        <PostContent {...reply} likedByMe={repliesLikedByMe.includes(reply._id)}/>
                    </div>
                ))}
            </div>
        </Layout>
    );
}