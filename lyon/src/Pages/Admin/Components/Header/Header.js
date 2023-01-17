import './style.css'
import { IoSearchOutline } from 'react-icons/io5'

const Header = props => {
    return <div id="header">
        <span id="pageTitle">{props.title}</span>
        <div id="search">
            <label htmlFor="search_bar"><IoSearchOutline /></label>
            <input type="text" name="search" id="search_bar" placeholder='Procurar' />
        </div>
    </div>
}

export default Header