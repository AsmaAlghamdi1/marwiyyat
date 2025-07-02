import {Navbar} from '../components/navbar'
import {Herosection} from '../components/herosection'
import {Footer} from '../components/footer'
import '../css/homepage.css'

function Homepage() {
  return (
    <div className='main-container'>
       <Navbar/>
       <Herosection/>
       <Footer/>
    </div>
   
  )
}
export default Homepage