export default function Avatar({src,big}){
    const widthClass = big ? 'w-32 h-32' : 'w-10 m-2'; 
    return (
        <div className= {'overfow-hidden '+ widthClass}>
            <img src = {src} alt = "avatar" className='rounded-full w-full h-full object-cover'/>
        </div>
    );
}