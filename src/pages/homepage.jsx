import {Navbar} from '../components/navbar'
import {Herosection} from '../components/herosection'
import { WhatWeOffer } from '../components/WhatWeOffer';
import {Footer} from '../components/footer'
import '../css/homepage.css'
import ProjectsSlider from '../components/ProjectsSlider';
import { Whatisirth } from '../components/WhatIsIrth';
import {Mobadrahsection} from '../components/mobadrahsection'
import { Contactus } from '../components/contactus';
import { Mapsection } from '../components/mapsection';
import React ,{useEffect} from 'react';
import ChatWidget from '../components/ChatWidget';


function Homepage() {
  useEffect(()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  },[]);
  return (
  <div className='main-container'>
       <Navbar/>
       <section id="home">
        <Herosection/>
       </section>
       <section id='goals'>
        <WhatWeOffer /> 
       </section>
       <section id='map'>
        <Mapsection/>
       </section>
     
       <section id='contact'>
        <Contactus/>
       </section>
      <ChatWidget/>

       <Footer/>
    </div>
  )
}
export default Homepage