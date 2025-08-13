import { useState, useEffect} from 'react'
import './App.css'
import Lines from './components/Lines.tsx'
import Welcome from './components/Welcome.tsx'
import NavigationButtons from './components/NavigationBar.tsx'
import Header from './components/Header.tsx'
import PageContent from './components/PageContent.tsx'
import StatusLine from './components/StatusLine.tsx'
import CommandBar from './components/CommandBar.tsx'

const handleKey = ({
  e,
  isStart, 
  setIsStart,
  setSelected
}: {
  e: KeyboardEvent;
  isStart: boolean;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
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

    useEffect(() => {
        const keyBoardListener = (e: KeyboardEvent) => handleKey({e, 
                                                                 isStart, 
                                                                 setIsStart, 
                                                                 setSelected });

        const clickListener = (e: MouseEvent) => handleClicks({e,
                                                              setIsStart});

        window.addEventListener('keydown', keyBoardListener);
        window.addEventListener('click', clickListener);
        return () => {
            window.removeEventListener('keydown', keyBoardListener);
            window.removeEventListener('click', clickListener);
        };
    }, [isStart]);

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
                />
            </main>
            <StatusLine />
            <CommandBar />
        </>
    );
}

export default App;
