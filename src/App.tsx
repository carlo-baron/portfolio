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

function NavigationButtons({
        selected,
        setSelected,
    }:{
        selected: string;
        setSelected: React.Dispatch<React.SetStateAction<string>>;
    }){


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
        </>
    );
}

function Home(){
   return(
        <div className="home page-content">
            <pre>
{`
# Welcome to carlo.dev -----------------------------------
Hi there! I'm glad you're here.

This site is my personal space to explore and share my work
as a student developer. I'm passionate about full-stack 
development and systems programming.

## 📌 Quick Stats ----------------------------------------
- Projects:     5 active
- Current Task: Writing this portfolio
- Last Updated: August 2025

# 🚀 Current Goals----------------------------------------
- ✅ Finish building this portfolio site
- 📝 Publish a full-stack React project
- 📦 Try deploying a personal app using Docker
- 🔍 Explore WebAssembly for future projects
`}
            </pre>
        </div>
   ); 
}

function Projects(){
   return(
        <div className="projects page-content">
            <pre>
{`
# 🛠️ Projects --------------------------------------------
Here are some of the personal projects I've built to learn,
explore, and apply different technologies.

## 📂 Active Projects ------------------------------------
- **todo-app/**
  - A minimalist task manager using React and Tailwind CSS
  - GitHub: TBA 
- **rantals/**
    - A social media platform dedicated for dev blogs
    - GitHub: TBA 

# 🧠 Tech Stack ------------------------------------------ 
- **Languages**: JavaScript && TypeScript, Python, C#, PHP 
- **Frameworks**: React, Node.js, Express.js 
- **Tools**: Git, Neovim, Google, ChatGPT
`}
            </pre>
        </div>
   ); 
}

function About(){
   return(
        <div className="about page-content">
            <pre>
{`
# 👋 About Me --------------------------------------------
I enjoy working across the stack and continuously learning 
new technologies. [X] [IG] [GitHub] [FB]

## 🧰 Skills Summary ------------------------------------
- Problem solving
- Collaboration and communication
- Systems thinking
- Attention to detail

## 🎓 Education -----------------------------------------
- B.S. in Information Technology @ Centro Escolar University 
- Expected Graduation: 2028 

## 📄 Resume --------------------------------------------
[Download Resume] (or ":open resume.pdf")
`}
            </pre>
        </div>
   ); 
}

function PageContent({selected}:{selected:string}){
    function pageToLoad(){
        switch(selected){
            case "home":
                return <Home/>
            case "projects":
                return <Projects/>
            case "about":
                return <About/>
            default: 
                return <div></div>
        }
    }
    return(
        <>
            <div className="content">
                {pageToLoad()}
            </div>
        </>
    );
}

function App() {
    const [isStart, setIsStart] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>("home");

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
                    <div className="wrapper">
                        <Header />
                        <NavigationButtons
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <PageContent 
                            selected={selected}
                        />
                    </div>
                )
            }
            <Lines />
        </main>
    );
}

export default App;
