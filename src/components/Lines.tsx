import { useEffect } from 'react'

function Line( { number, isActive }: { number: number; isActive: boolean;} ){
    return (
        <div className="line">
            <p className="line-num">{number}</p>
            <div className={`highlight ${isActive ? 'active' : ''}`}>
            </div>
        </div>
    );
}

function Lines({selected, isStart, activeLineIndex, lineCount, setLineCount}:{selected: string; isStart:boolean; activeLineIndex: number; lineCount: number; setLineCount:  React.Dispatch<React.SetStateAction<number>>;}): React.JSX.Element{

    useEffect(() => {
        const lineHeight = 24;
        const mainEl = document.querySelector('main');

        const calcLines = () => {
            const contentHeight = mainEl?.scrollHeight || document.body.scrollHeight;

            let targetParts = Math.floor((contentHeight + lineHeight) / lineHeight);
            if (targetParts % 2 !== 0) targetParts -= 1;

            setLineCount(targetParts);
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
                />
        );
    }

    return (
        <div className="lines">
            {lines}
        </div>
    );
}

export default Lines;
