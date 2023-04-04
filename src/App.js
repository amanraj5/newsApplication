import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pageSize = 6;
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('light');
  const [text, setText] = useState("Enable Dark Mode");


  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setText('Enable Light Mode')
      document.body.style.backgroundColor = '#2E4F4F'
    }
    else {
      setMode('light');
      setText('Enable Dark Mode')
      document.body.style.backgroundColor = 'white'
    }
  }
  return (
    <div>
      <Router>
        <Navbar mode={mode} text={text} toggleMode={toggleMode} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path='/general' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />}></Route>
          <Route exact path='/business' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />}></Route>
          <Route exact path='/entertainment' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}></Route>
          <Route exact path='/health' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />}></Route>
          <Route exact path='/science' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}></Route>
          <Route exact path='/sports' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}></Route>
          <Route exact path='/technology' element={< News mode={mode} setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}></Route>
        </Routes>

      </Router>
    </div>
  )
}

export default App;

