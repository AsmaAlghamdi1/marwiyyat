import {MainNavbar} from '../components/mainNavbar'
import {Mobadrahsection} from '../components/mobadrahsection'
import { Whatisirth } from '../components/WhatIsIrth';
import ProjectsSlider from '../components/ProjectsSlider';
import {Footer} from '../components/footer'






function Mainpage(){
    
 return (
    <div>
        <MainNavbar/>
        <Mobadrahsection/>
        <section id="MobadrahsectionURL">
        <Whatisirth/>
        </section>
        <section id='ProjectsSliderURL'>
        <ProjectsSlider/>
        </section>
        <Footer/>
        

    </div>




 )
}
export default Mainpage