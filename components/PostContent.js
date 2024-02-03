import ReactTimeAgo from "react-time-ago";
import Avatar from "./Avatar";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({text,author, createdAt,_id,likesCount,likedByMe,commentsCount,big = false}){

    return(
        <div>
            <div className="flex w-full">
                <div>
                   <Link href= {'/' + author?.username}>
                        <div className="cursor-pointer">
                            <Avatar src = {author.image} />
                        </div>
                    </Link>
                </div>
                <div className="pl-1 grow">
                    <div>
                        <Link href={'/' + author?.username}>
                            <span className="font-bold pr-1 cursor-pointer">{author.name}</span>
                        </Link>
                        {big && <br/>}
                        <Link href={'/' + author?.username}>
                            <span className="text-twitterLightGray cursor-pointer">@{author.username}</span>
                        </Link>
                        {createdAt && !big && (<span className="pl-1 text-twitterLightGray"><ReactTimeAgo date={createdAt} timeStyle='twitter'/></span>) }
                    </div>
                    {!big && (
                        <div>
                            <Link href={`/${author.username}/status/${_id}`}>
                                <div className="w-full cursor-pointer">
                                    {text}
                                </div>
                            </Link>
                            <PostButtons id = {_id} username = {author.username} likesCount={likesCount} likedByMe={likedByMe} commentsCount = {commentsCount}/>
                        </div>
                    )}
                </div>
            </div>
            {big && (
                <div className="mt-2">
                    <Link href={`/${author.username}/status/${_id}`}>
                        <div className="w-full cursor-pointer">
                            {text}
                        </div>
                    </Link>
                    {createdAt && (
                        <div className="text-twitterLightGray test-sm mt-2">
                            {(new Date(createdAt)).toISOString().replace('T',' ').slice(0,16).split(' ').reverse().join(' ')}
                        </div>
                    )}
                    <div className="border-t border-b border-twitterBorder mt-3 py-2 mb-2">
                        <PostButtons id = {_id} username = {author?.username} likesCount={likesCount} likedByMe={likedByMe} commentsCount = {commentsCount}/>
                    </div>
                </div>
            )}
        </div>
    );
}