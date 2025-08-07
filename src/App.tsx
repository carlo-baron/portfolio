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
        const lineHeight = 32;
        const mainHeight = document.querySelector('main')?.clientHeight || window.innerHeight;

        let targetParts = Math.floor(mainHeight / lineHeight);
        if (targetParts % 2 !== 0) targetParts -= 1;

        setLineCount(targetParts);
        setActiveLineIndex(1);
    }, []);

    const lines = [];
    for (let i = 0; i < lineCount; i++) {
        lines.push(
            <Line 
            key={i} 
            number={i + 1} 
            isActive={i === activeLineIndex}
            onMouseEnter={() => setActiveLineIndex(i)}/>
        );
    }

    return <>{lines}</>;
}

function App() {
    return (
        <>
            <main>
                <div className="content">
                </div>
                <Lines />
            </main>
        </>
    );
}

export default App;

