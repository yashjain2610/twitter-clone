import { useState } from "react";
import { FileDrop } from "react-file-drop";

export default function Cover(){

    const [isFileNearBy,setIsFileNearBy] = useState(false);
    const [isFileOver,setIsFileOver] = useState(false);
    const [isUploading,setisUploading] = useState(false);
    let extraClasses = '';
    if(isFileNearBy) extraClasses += 'bg-gray';
    if(isFileOver) extraClasses += 'bg-blue-500';

    function updateImage(files,e){
        e.preventDefault();
        setisUploading(true);
        setIsFileNearBy(false);
        setIsFileOver(false);

        const data = new FormData();
        data.append('cover',files[0]);
        fetch('/api/upload', {
            method: 'POST',
            body: data,
        }).then(() => {
            setisUploading(false);
        })
    }

    return (
        <FileDrop 
            onDrop={updateImage}
            onDragOver={() => {setIsFileOver(true)}} 
            onFrameDragEnter={() => {setIsFileNearBy(true)}} 
            onFrameDragLeave={() => {setIsFileNearBy(false)}} 
            onDragLeave={() => {setIsFileOver(false)}} 
        >
            <div className= {'h-36 bg-twitterDarkGray ' + extraClasses} >
                {isUploading ? 'uploading' : ''}
            </div>

        </FileDrop>
    )
}