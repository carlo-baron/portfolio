function Home(){
   return(
    <div className="home page-content">
        <section>
            <h1>Welcome to carlo.dev</h1>
            <p className="filler">==============================================================================</p>
            <p>Hi there! I'm glad you're here.</p>
            <p>
                This site is my personal space to explore and share my work as a student
                developer. I'm passionate about full-stack development and systems programming.
            </p>
        </section>

        <section>
            <h1>📌 Quick Stats</h1>
            <p className="filler">==============================================================================</p>
            <ul>
                <li>Projects: 2 active</li>
                <li>Current Task: Creating Website Templates</li>
                <li>Last Updated: October 2025</li>
            </ul>
        </section>

        <section>
            <h1>🚀 Current Goals</h1>
            <p className="filler">==============================================================================</p>
            <ul>
                <li>✅ Finish building a social app with Next.js</li>
                <li>📝 Publish my social media app</li>
                <li>📦 Try deploying more projects</li>
                <li>🔍 Learn backend development</li>
            </ul>
        </section>
    </div>
   ); 
}

function Projects(){
   return(
    <div className="projects page-content">
        <section>
            <h1>🛠️ Projects</h1>
            <p>
                Here are some of the personal projects I've built to learn,
                explore, and apply different technologies.
            </p>
        </section>
            <p className="filler">==============================================================================</p>
        <section>
            <h1>📂 Active Projects</h1>
            <ul>
                <li>
                    <strong><a href="https://kwicom.vercel.app/" target='_blank'>
                      kwicom/
                    </a></strong><br />
                    A basic social app made with Next.js + MongoDB<br />
                    GitHub: <em><a target='_blank' href="https://github.com/carlo-baron/kwicom">
                    Click Me!</a></em>
                </li>
                <li>
                    <strong><a>
                    rantals/</a></strong><br />
                    A social media platform dedicated for dev blogs<br />
                    GitHub: <em>
                    <a href="https://github.com/carlo-baron/rantals">
                      Click Me! 
                    </a>
                  </em>
                </li>
                <li>
                    <strong><a>
                    chaoSim/</a></strong><br />
                    A software built using c# and SFML that simulate chaos game<br />
                    GitHub: <em>
                    <a href="https://github.com/carlo-baron/chaoSim" target='_blank'>
                      Click Me!
                    </a>
                    </em>
                      
                </li>
            </ul>
        </section>
            <p className="filler">==============================================================================</p>
        <section>
            <h1>🧠 Tech Stack</h1>
            <ul>
              <li><strong>Languages:</strong> JavaScript & TypeScript, Python, C#, PHP</li>
              <li><strong>Frameworks:</strong> React, Next.js, Node.js, Express.js</li>
              <li><strong>Tools:</strong> Git, Neovim, MUI, Framer Motion</li>
              <li><strong>Others:</strong> Google, ChatGPT</li>
            </ul>
        </section>
    </div>
   ); 
}

function About() {
    return (
        <div className="about page-content">
            <section>
                <h1>👋 About Me</h1>
                <p>
                    I enjoy working across the stack and continuously learning
                    new technologies. 
                </p>
            </section>
            <p className="filler">==================================================================================</p>
            <section>
                <h1>🧰 Skills Summary</h1>
                <ul>
                    <li>Problem solving</li>
                    <li>Collaboration and communication</li>
                    <li>Systems thinking</li>
                    <li>Attention to detail</li>
                </ul>
            </section>
                <p className="filler">==============================================================================</p>
            <section>
                <h1>🎓 Education</h1>
                <ul>
                    <li>B.S. in Information Technology @ Centro Escolar University</li>
                    <li>Expected Graduation: 2028</li>
                </ul>
            </section>
                <p className="filler">==============================================================================</p>
            <section>
                <h1>📄 Resume</h1>
                <p>
                    <a 
                    className='underline'
                    href="/RESUME.pdf"
                    download
                    >Download Resume</a> (or type :open resume.pdf)
                </p>
            </section>
                <p className="filler">==============================================================================</p>
            <section>
                <h1>🌐 Socials</h1>
                <ol>
                  <li>
                    <a 
                    href="https://www.linkedin.com/in/carlo-baron-dev"
                    target='_blank'
                    >
                      - LinkedIn                
                    </a>
                  </li>
                  <li>
                    <a 
                    href="https://github.com/carlo-baron/"
                    target='_blank'
                    >
                      - GitHub 
                    </a>
                  </li>
                  <li>
                    <a 
                    href="https://www.instagram.com/lodsqq/"
                    target='_blank'
                    >
                      - Instagram
                    </a>
                  </li>
                  <li>
                    <a 
                    href="https://www.facebook.com/carlo.baron.96/"
                    target='_blank'
                    >
                      - Facebook
                    </a>
                  </li>
                </ol>
            </section>
        </div>
    );
}

export default function PageContent({selected}:{selected:string}){
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
