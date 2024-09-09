import React from 'react'
import { BrowserRouter as Router , Route , Link, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import About from './Components/About';
import AuthForm from './Components/AuthForm';
function App() {
  return (
    <>
      <Router>
        <div className="container">
        <Routes>
          {/* <Navbar/> */}
          <Route path="/" element={<AuthForm />}/>    
          <Route path="/home" element={<Home />}/>    
          <Route path="/about" element={<About />}/>
          
        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
