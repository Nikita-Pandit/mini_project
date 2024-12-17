import React from 'react'
import StudentHeader from './components/StudentHeader'
import Footer from './components/footer';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import { Link } from 'react-router-dom'
import ResearchDoubts from "./pages/ResearchDoubts"
import Profile from "./pages/Profile";

// import Body from './components/body';
import Login from "./pages/Login"

const App = () => {

  return (
   <Router>
    <StudentHeader/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Profile" element={<Profile />} />

    <Route path="/Projects" element={<Projects/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
    <Route path="/Login" element={<Login/>}/>
      <Route path="/ResearchDoubts" element={<ResearchDoubts/>}/>
    </Routes>
    {/* <Body/> */}
    <Footer/>
   </Router>
  )
}

export default App

