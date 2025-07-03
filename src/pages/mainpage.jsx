import { MainNavbar } from '../components/mainNavbar'
import { Mobadrahsection } from '../components/mobadrahsection'
import { Footer } from '../components/footer'
import '../css/mobadrahsection.css'


function Mainpage() {
    return (
        <div >
            <MainNavbar />
            <Mobadrahsection />
            <Footer />
        </div>
    )
}
export default Mainpage