import {Navbar} from '../components/navbar'
import {Herosection} from '../components/herosection'
import { WhatWeOffer } from '../components/WhatWeOffer';
import {Footer} from '../components/footer'
import '../css/homepage.css'
import ProjectsSlider from '../components/ProjectsSlider';
import { Whatisirth } from '../components/WhatIsIrth';
import {Mobadrahsection} from '../components/mobadrahsection'


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

       </section>
       <section id='contact'>

       </section>
       {/* <Whatisirth/>
       <ProjectsSlider/>
<Mobadrahsection/> */}
       <Footer/>
    </div>
  )
}
export default Homepage