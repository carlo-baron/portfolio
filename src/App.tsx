import { useRef, useState, useEffect} from 'react'
import './App.css'
import Lines from './components/Lines.tsx'
import Welcome from './components/Welcome.tsx'
import NavigationButtons from './components/NavigationBar.tsx'
import Header from './components/Header.tsx'
import PageContent from './components/PageContent.tsx'
import StatusLine from './components/StatusLine.tsx'
import CommandBar from './components/CommandBar.tsx'

function clamp ({num, min, max}:{num: number; min: number; max: number}): number{
    return Math.min(Math.max(num, min), max);
}

const handleKey = ({
  e,
  isStart, 
  setIsStart,
  setSelected,
  lineCount,
  setActiveLineIndex,
}: {
  e: KeyboardEvent;
  isStart: boolean;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  lineCount: number;
  setActiveLineIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    if(isStart){
        if (e.key === 'i') {
            setIsStart(false);
        }
    }else{
        switch(e.key){
            case '1':
                setSelected("home");
                break;
            case '2':
                setSelected("projects");
                break;
            case '3':
                setSelected("about");
                break;
        }  
    }

    if(e.key === 'j'){
        setActiveLineIndex(prev => clamp({ num: prev + 1, min: 0, max: lineCount - 1 }));
    }else if(e.key === 'k'){
        setActiveLineIndex(prev => clamp({ num: prev - 1, min: 0, max: lineCount - 1 }));
    }
};

const handleClicks = ({
  e,
  setIsStart,
}: {
  e: MouseEvent;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    switch(e){
        default:
            return setIsStart(false);
    }
};

function Cursor({ lineIndex }: { lineIndex: number }) {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const mainEl = document.querySelector('main');
        if (!mainEl || mainEl.classList.contains("start")) return;

        const lineHeight = 24;
        const cursorTop = lineIndex * lineHeight;
        const cursorBottom = cursorTop + lineHeight;

        const scrollTop = mainEl.scrollTop;
        const viewHeight = mainEl.clientHeight;

        const viewTop = scrollTop;
        const viewBottom = scrollTop + viewHeight;

        if (cursorBottom > viewBottom) {
            const nextScroll = Math.min(cursorBottom - viewHeight, mainEl.scrollHeight - viewHeight);
            mainEl.scrollTop = nextScroll;
        }

        else if (cursorTop < viewTop) {
            const nextScroll = Math.max(cursorTop, 0);
            mainEl.scrollTop = nextScroll;
        }

    }, [lineIndex]);

    return (
        <div
            key={lineIndex}
            className="cursor"
            ref={cursorRef}
            style={{
                position: 'absolute',
                top: `${lineIndex * 24}px`,
            }}
        />
    );
}

function App() {
    const [isStart, setIsStart] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("home");
    const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
    const [lineCount, setLineCount] = useState<number>(0);

    useEffect(() => {
        const keyBoardListener = (e: KeyboardEvent) => handleKey({e, 
                                                                 isStart, 
                                                                 setIsStart, 
                                                                 setSelected, 
                                                                 lineCount,
                                                                 setActiveLineIndex});

        const clickListener = (e: MouseEvent) => handleClicks({e,
                                                              setIsStart});
        const mainEl = document.querySelector("main");
        const wheelListener = (e: WheelEvent) =>  {
            e.preventDefault(); 
            const wheelVal: number = e.deltaY > 0 ? 1 : -1;
            setActiveLineIndex(prev => clamp({ num: prev + wheelVal, min: 0, max: lineCount - 1 }));
        };

        window.addEventListener('keydown', keyBoardListener);
        window.addEventListener('click', clickListener);
        mainEl?.addEventListener('wheel', wheelListener);
        return () => {
            window.removeEventListener('keydown', keyBoardListener);
            window.removeEventListener('click', clickListener);
            mainEl?.removeEventListener('wheel', wheelListener);
        };
    }, [isStart, lineCount]);

    return (
        <>
            <main className={
                isStart ? "start" : ""
            }>
                <div className="wrapper">
                    <Cursor lineIndex={activeLineIndex}/> 
                    {isStart ? 
                        (<Welcome />) 
                        : 
                        (
                        <>
                            <Header />
                            <NavigationButtons
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <PageContent 
                                selected={selected}
                            />
                        </>
                        )
                    }
                </div>
                <Lines 
                    selected={selected} 
                    isStart={isStart}
                    activeLineIndex={activeLineIndex}
                    setActiveLineIndex={setActiveLineIndex}
                    lineCount={lineCount}
                    setLineCount={setLineCount}
                />
            </main>
            <StatusLine />
            <CommandBar />
        </>
    );
}

export default App;
