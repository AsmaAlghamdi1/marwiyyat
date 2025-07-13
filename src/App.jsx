import './App.css'
import {Navbar} from './components/navbar'
import {Footer} from './components/footer'
import Homepage from './pages/homepage'
// import Mainpage from './pages/mainpage'
import 'leaflet/dist/leaflet.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect,useState } from 'react';
import Mainpage from "./pages/mainpage";  
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { MainNavbar } from './components/mainNavbar';
import './i18n';
// import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  // const [theme, setTheme] = useState('light'); // القيمة المبدئية

  // كل ما تغير الثيم، نحدث كلاس على body
  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  // زر التبديل
  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  // };

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1500, 
  //     once: true      
  //   });
  // }, []);

  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>

  {/* <MainNavbar toggleTheme={toggleTheme} theme={theme}/> */}
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
