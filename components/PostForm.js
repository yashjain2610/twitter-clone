import useUserInfo from "@/hooks/useUserInfo";
import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";

export default function PostForm({onPost,compact,parent,placeholder = 'what\'s happening?'}){
    const {userInfo,stauts} = useUserInfo();
    const [text,setText] = useState('');

    if(stauts === 'loading'){
        return '';
    }

    async function handlePostSubmit(e){
        e.preventDefault();
        await axios.post('/api/posts',{text,parent});
        setText('');
        if(onPost){
          onPost();
        }
    }

    return (
        <form className="mx-5" onSubmit={handlePostSubmit}>
        <div className={ (compact ? 'items-center' : '') + " flex"}>
          <div>
            <Avatar src= {userInfo?.image}/>
          </div>
          <div className='grow pl-2 pr-4'>
            <textarea className={ (compact? 'h-10' : 'h-24') + ' w-full p-2 bg-transparent text-twitterWhite'} placeholder={placeholder} value={text} onChange={e => {
                setText(e.target.value)
            }}/>
            {!compact && (
              <div className='text-right border-t border-twitterBorder pt-2 pb-2'>
                <button className='bg-twitterBlue text-white px-5 py-1 rounded-full'>tweet</button>
              </div>
            )}
          </div>
          {compact && (
            <div>
               <button className='bg-twitterBlue text-white px-5 py-1 rounded-full'>reply</button>
            </div>
          )}
        </div>
      </form>
    );
}