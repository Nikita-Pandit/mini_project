import React from 'react'
import StudentHeader from './components/StudentHeader'
import Footer from './components/footer';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import ResearchDoubts from "./pages/ResearchDoubts"
import Profile from './pages/profile';
import Body from './components/body';
const App = () => {
  return (
   <Router>
    <StudentHeader/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Profile" element={<Profile/>}/>
    <Route path="/Projects" element={<Projects/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/ResearchDoubts" element={<ResearchDoubts/>}/>
    </Routes>
    <Body/>
    <Footer/>
   </Router>
  )
}

export default App

