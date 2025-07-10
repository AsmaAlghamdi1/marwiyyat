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


function Homepage() {
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
       {/* <Whatisirth/> */}
       {/* <ProjectsSlider/>
<Mobadrahsection/> */}

       <Footer/>
    </div>
  )
}
export default Homepage