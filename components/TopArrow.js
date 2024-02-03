import Link from "next/link";

export default function TopArrow({title = 'Post' ,url = '/'}){
    return (
        <Link href={url}>
            <div className="flex mb-5 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                {title}
            </div>
       </Link>
    );
}