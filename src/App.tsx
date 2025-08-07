import { useState, useEffect, useRef } from 'react'
import './App.css'

function Line({ number, isActive, onMouseEnter }: { number: number, isActive: boolean, onMouseEnter: () => void }) {
    return (
        <div className="line" onMouseEnter={onMouseEnter}>
            <p className="line-num">{number}</p>
            <div className={`highlight ${isActive ? 'active' : ''}`}>
                <div className="cursor"></div>
            </div>
        </div>
    );
}

function Lines(): JSX.Element {
    const [lineCount, setLineCount] = useState<number>(0);
    const [activeLineIndex, setActiveLineIndex] = useState<number>(0);

    useEffect(() => {
        const lineHeight = 24;
        const mainHeight = document.querySelector('main')?.clientHeight || window.innerHeight;

        let targetParts = Math.floor((mainHeight + lineHeight) / lineHeight);
        if (targetParts % 2 !== 0) targetParts -= 1;

        setLineCount(targetParts);
        setActiveLineIndex(0);
    }, []);

    const lines = [];
    for (let i = 0; i < lineCount; i++) {
        lines.push(
            <Line
                key={i}
                number={i + 1}
                isActive={i === activeLineIndex}
                onMouseEnter={() => setActiveLineIndex(i)} />
        );
    }

    return (
        <div className="lines">
            {lines}
        </div>
    );
}

function Welcome() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [topOffset, setTopOffset] = useState<number>(0);

    useEffect(() => {
        const calcTop = () => {
            const wrapper = wrapperRef.current;
            const lineHeight = 24;

            if (wrapper) {
                const mainHeight = document.querySelector('main')?.clientHeight || window.innerHeight;
                const wrapperHeight = wrapper.clientHeight;

                const rawTop = (mainHeight - wrapperHeight) / 2;
                const snappedTop = Math.round(rawTop / lineHeight) * lineHeight;

                setTopOffset(snappedTop);
            }
        }

        calcTop();
        window.addEventListener('resize', calcTop);
        return () => window.removeEventListener('resize', calcTop);
    }, []);

    return (
        <div 
        className="wrapper welcome"
        ref={wrapperRef}
        style={{top: `${topOffset}px`}}
        >
            <div className="head">Carlo's Portfolio v0.1.0</div>
            <div className="command">
                <span>type: :help<span>&lt;Enter&gt;</span></span>
                <span>type: i<span>&lt;Enter&gt;</span></span>
                <span>type: q<span>&lt;Enter&gt;</span></span>
                <span>type: resume<span>&lt;Enter&gt;</span></span>
            </div>
            <div className="desc">
                <p>if you're new!</p>
                <p>to view</p>
                <p>to exit</p>
                <p>download resume</p>
            </div>
        </div>
    );
}

function NavigationButtons(){
    const [selected, setSelected] = useState<string>("home");

    return(
        <nav>
            <button 
            className={selected === "home" ? 'selected' : ''}
            onClick={() => setSelected("home")}
            >(1) Home</button>

            <button 
            className={selected === "projects" ? 'selected' : ''}
            onClick={() => setSelected("projects")}
            >(2) Projects</button>

            <button 
            className={selected === "about" ? 'selected' : ''}
            onClick={() => setSelected("about")}
            >(3) About</button>
        </nav>
    );
}

function Header() {
    return (
        <>
            <div className="wrapper">

                <div className="banner">
                    <pre>
{` ██████╗ █████╗ ██████╗ ██╗      ██████╗ 
██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗
██║     ███████║██████╔╝██║     ██║   ██║
██║     ██╔══██║██╔══██╗██║     ██║   ██║
╚██████╗██║  ██║██║  ██║███████╗╚██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝
`}
                    </pre>
                    <div className="my-title">Student Developer</div>
                    <div className="self-intro">I’m a student working toward becoming a software engineer, with an interest in both front-end and back-end development for web and other systems. I enjoy tackling challenges, thinking through problems carefully, and collaborating with others to find effective solutions.</div>
                </div>
                <NavigationButtons/>
            </div>
        </>
    );
}

function App() {
    const [isStart, setIsStart] = useState<boolean>(true);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'i') {
                setIsStart(false);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <main>
            {isStart ? (<Welcome />) : 
                (
                    <Header />
                )
            }
            <Lines />
        </main>
    );
}

export default App;
