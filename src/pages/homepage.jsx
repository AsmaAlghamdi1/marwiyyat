import {Navbar} from '../components/navbar'
import {Herosection} from '../components/herosection'
import { WhatWeOffer } from '../components/WhatWeOffer';
import {Footer} from '../components/footer'
import '../css/homepage.css'


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
       <section id='contact'></section>
       <Footer/>
    </div>
  )
}
export default Homepage