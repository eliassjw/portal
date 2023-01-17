import './style.scss'
import { RxDashboard, RxExit } from 'react-icons/rx'
import { HiUserGroup } from 'react-icons/hi'
import { IoCashOutline } from 'react-icons/io5'
import { TbTruckDelivery } from 'react-icons/tb'
import { MdSettings } from 'react-icons/md'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Menu = props => {
    useEffect(() => {
        if (document.getElementById('menu').querySelector('#selected')) {
            document.getElementById('selected').id = ''
        }
        document.getElementById('menu').querySelectorAll('.option')[props.tabID].id = 'selected'
    })

    return <div id='menu'>
        <div id="menuTitle">
            <span id="logo">Lyon</span>
            <span id="subTitle">Administração</span>
        </div>
        <div id="menuOptions">
            <Link to='/administration/panel'><button className="option"><span className="menuIcon"><RxDashboard /></span><span className="innerOption">Home</span></button></Link>
            <Link to='/administration/panel/clients'><button className="option"><span className="menuIcon"><HiUserGroup /></span><span className="innerOption">Clientes</span></button></Link>
            <Link to='/administration/panel/sales'><button className="option"><span className="menuIcon"><IoCashOutline /></span><span className="innerOption">Vendas</span></button></Link>
            <Link to='/administration/panel/deliveries'><button className="option"><span className="menuIcon"><TbTruckDelivery /></span><span className="innerOption">Entregas</span></button></Link>
        </div>
        <div id="lastOptions">
            <Link to='/administration/panel/settings'><button className="option"><span className="menuIcon"><MdSettings /></span><span className="innerOption">Configurações</span></button></Link>
            <Link to='/'><div className="option" id='exit'><span className="menuIcon"><RxExit /></span><span className="innerOption">Sair</span></div></Link>
        </div>
    </div>
}

export default Menu