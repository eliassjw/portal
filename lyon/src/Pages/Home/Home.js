import './style.css'
import Banner from '../../Components/Banner/banner'
import Header from '../../Components/Header/Header'
const Home = props => {
    return (
        <>
            <Header />
            <div id="main">
                <Banner></Banner>
            </div>
    
            <footer>Copyright (c) Lyon Grifes. Todos os direitos reservados.</footer>
        </>
    )
}

export default Home