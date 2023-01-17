
import { FaUserCircle } from 'react-icons/fa'
// import { GiLargeDress } from 'react-icons/gi'
// import { TbMoodKid } from 'react-icons/tb'
// import { SlLogin } from 'react-icons/sl'
import { IoBagOutline, IoSearchOutline, IoLogOutOutline } from 'react-icons/io5'
import { IoMdHeartEmpty } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthEmailContext, AuthGoogleContext } from '../../Contexts/clientAuth'
// import Cart from '../Profile/Cart/Cart'
// import Favorites from '../Profile/Favorites/Favorites'
const Header = props => {
    let scrollPos = 0;
    let hideHeader = true;
    window.onscroll = () => {
        if (window.scrollY > 700 && scrollPos > window.scrollY) {
            document.getElementById('header').classList.add('full')
            document.getElementById('header').classList.remove('outScene')
        } else {
            if ((window.scrollY > 700 && scrollPos < window.scrollY)) {
                hideHeader = false;
                if (!document.getElementById('header').classList.contains('outScene') && document.getElementById('header').classList.contains('full')) {
                    document.getElementById('header').classList.add('outScene');
                }
            }
            if (!hideHeader && window.scrollY < 700) {
                hideHeader = true
                document.getElementById('header').classList.remove('full')
                document.getElementById('header').classList.add('outScene');
                setTimeout(() => document.getElementById('header').classList.remove('outScene'), 300);
            }
            
        }
        scrollPos = window.scrollY;
    }

    return <>
        <header id="header" className={props.full ? 'full noShadow' : ''}>
            <div className='buttons'>
                <div id='categories'>
                    <button>Categorias</button>
                    <button>Sobre</button>
                </div>
            </div>
            <span id="logo"><Link to='/'>Lyon</Link></span>
            <div className='buttons'>
                <div id="user_buttons">
                    <button title='Buscar'><span className="buttonIcon fillIcon"><IoSearchOutline /></span></button>
                    {HeaderConfiguration()}
                </div>
            </div>
        </header>
    </>
}
function HeaderConfiguration(){
    const { signOutGoogle, signedInWithGoogle } = useContext(AuthGoogleContext)
    const { signOutEmail, signedInWithEmail } = useContext(AuthEmailContext)
    const client = JSON.parse(localStorage.getItem('@SYSTEM:userCredentials'))
    if (signedInWithGoogle || signedInWithEmail) {
        const clientName = client.displayName.split(' ')[0].slice(0, 1).toUpperCase() + client.displayName.split(' ')[0].slice(1).toLowerCase();
        return <>
            <button title='Sacola'><Link to="/cart"><span className='buttonIcon'><IoBagOutline /></span></Link></button>
            <button title='Favoritos'><Link to="/favorites"><span className='buttonIcon fillIcon'><IoMdHeartEmpty /></span></Link></button>
            <Link to='/profile'><button title='Perfil' id='profile_icon'><span className="buttonIcon fillIcon"><FaUserCircle /></span>Olá, {clientName}</button></Link>
            <button title='Sair' onClick={() => {
                signOutEmail()
                signOutGoogle()
            }}><span className="buttonIcon"><IoLogOutOutline /></span></button>
        </>
    } else return <Link to='/login'><button title='Faça login'>Login</button></Link>
}


export default Header