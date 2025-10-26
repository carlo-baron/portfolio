import { useRef, useState } from 'react';

export default function Header() {
    const introRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState<boolean>(true);

    function expandText(){ 
       setIsOverflowing(prev => !prev); 
    }
    
    return (
        <div
        className='flex justify-center'
        >
            <div 
            className="banner"
            >
                <pre className="my-name">
{` ██████╗ █████╗ ██████╗ ██╗      ██████╗ 
██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗
██║     ███████║██████╔╝██║     ██║   ██║
██║     ██╔══██║██╔══██╗██║     ██║   ██║
╚██████╗██║  ██║██║  ██║███████╗╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝
`}
                </pre>
                <div className="my-title">"Student Developer"</div>
                <div 
                className={`self-intro ${isOverflowing ? "trunc-text" : ""}`}
                ref={introRef}
                onClick={expandText}
                >
                    <p>
                        I’m a student working toward becoming a software engineer, with an interest in both front-end and back-end development for web and other systems. I enjoy tackling challenges, thinking through problems carefully, and collaborating with others to find effective solutions.
                    </p>
                </div>
            </div>
        </div>
    );
}

