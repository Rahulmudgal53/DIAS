import React from 'react'
import { BrowserRouter as Router , Route , Link, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import About from './Components/About';
function App() {
  return (
    <>
      <Router>
        <Navbar/>
        {/* <Home/> */}
        <Routes>
          <Route path="/home" element={<Home />}/>    
          <Route exact path="/about" element={<About />}/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
