import React from 'react'
import StudentHeader from './components/studentHeader'
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import ResearchDoubts from "./pages/ResearchDoubts"
const App = () => {
  return (
   <Router>
    <StudentHeader/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Projects" element={<Projects/>}/>
    <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/ResearchDoubts" element={<ResearchDoubts/>}/>
    </Routes>
   </Router>
  )
}

export default App
