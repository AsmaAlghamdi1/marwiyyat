import './App.css'
import {Navbar} from './components/navbar'
import {Footer} from './components/footer'
import Homepage from './pages/homepage'
import 'leaflet/dist/leaflet.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Mainpage from "./pages/mainpage";  
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {

  return (
    <>

  
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />}/>
        <Route path="/home" element={<Homepage/>}/>
      </Routes>
    </Router>
   
    </>
  );
}

export default App
