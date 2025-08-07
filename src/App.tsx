import { useState, useEffect } from 'react'
import './App.css'

function Line({ number, isActive, onMouseEnter}: { number: number, isActive: boolean, onMouseEnter: () => void}) {
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

        let targetParts = Math.floor(mainHeight / lineHeight);
        if (targetParts % 2 !== 0) targetParts -= 1;

        setLineCount(targetParts);
        setActiveLineIndex(0);
    }, []);

    const lines = [];
    for (let i = 0; i < lineCount + 1; i++) {
        lines.push(
            <Line 
            key={i} 
            number={i + 1} 
            isActive={i === activeLineIndex}
            onMouseEnter={() => setActiveLineIndex(i)}/>
        );
    }

    return <>
            <div className="lines">
                {lines}
            </div>
        </>;
}

function Welcome(){
    return(
        <>
            <div className="wrapper">
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
        </>
    );
}

function App() {
    return (
        <>
            <main>
                <Welcome />
                <Lines />
            </main>
        </>
    );
}

export default App;

