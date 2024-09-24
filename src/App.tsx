import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { flushSync } from 'react-dom'

function App() {
const [dark, setDark] = useState(false)
useEffect(() => {
  document.documentElement.dataset.style="angled"
},[])




  return (
    <div id="" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <button
        onClick={() => {
          setDark(!dark);
          document.startViewTransition(() => {
            flushSync(() => {
              document.documentElement.dataset.theme = dark ? "dark" : "light";
            });
          });
        }}
        aria-pressed={dark}
        className="theme-toggle">
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
        </svg>
        <span className="sr-only">Toggle Theme</span>
      </button>
      <div className="select">
        <select onChange={(e) => (document.documentElement.dataset.style = e.target.value)}>
          <option value="vertical">Vertical</option>
          <option value="wipe">Wipe</option>
        </select>
      </div>
      <main>
        <div className="content">
          <h1>Use View Transitions</h1>
          <p>
            Progressively enhanced theme switching with View Transitions. If they're not supported,
            it changes instantly.
          </p>
        </div>
        <div className="images">
          <img src="https://picsum.photos/1200/1200?random=12" alt="" />
          <img src="https://picsum.photos/1200/1200?random=21" alt="" />
        </div>
      </main>
    </div>
  );
}

export default App
