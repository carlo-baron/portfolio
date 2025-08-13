import { useState, useEffect} from 'react'
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

function Cursor({lineIndex} : {lineIndex: number}){
    return(
        <div
            key={lineIndex}
            className="cursor"
            style={{ top: `calc(24px * ${lineIndex})`}}
        ></div>
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

        window.addEventListener('keydown', keyBoardListener);
        window.addEventListener('click', clickListener);
        return () => {
            window.removeEventListener('keydown', keyBoardListener);
            window.removeEventListener('click', clickListener);
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
