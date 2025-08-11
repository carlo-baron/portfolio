import { useState, useEffect } from 'react'

function Line({ number, isActive, onMouseEnter }: { number: number, isActive: boolean, onMouseEnter: () => void }) {
    return (
        <div className="line" onMouseEnter={onMouseEnter}>
            <p className="line-num">{number}</p>
            <div className={`highlight ${isActive ? 'active' : ''}`}>
            </div>
        </div>
    );
}

function Lines({selected, isStart, activeLineIndex, setActiveLineIndex}:{selected: string; isStart:boolean, activeLineIndex: number, setActiveLineIndex:  React.Dispatch<React.SetStateAction<
number>>}){
    const [lineCount, setLineCount] = useState<number>(0);

    useEffect(() => {
        const lineHeight = 24;
        const mainEl = document.querySelector('main');

        const calcLines = () => {
            const contentHeight = mainEl?.scrollHeight || document.body.scrollHeight;

            let targetParts = Math.floor((contentHeight + lineHeight) / lineHeight);
            if (targetParts % 2 !== 0) targetParts -= 1;

            setLineCount(targetParts);
            setActiveLineIndex(0);
        }
        calcLines();

        const resizeObserver = new ResizeObserver(calcLines);
        if(mainEl) resizeObserver.observe(mainEl);

        window.addEventListener('resize', calcLines); 
        return () => {
            window.removeEventListener('resize', calcLines);
            resizeObserver.disconnect();
        }
    }, [selected, isStart]);

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

export default Lines;
