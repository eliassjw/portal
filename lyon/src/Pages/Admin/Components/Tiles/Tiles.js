import { useState } from 'react';
import { RiFolderUserLine } from 'react-icons/ri'
import { BsBagCheck } from 'react-icons/bs'
import { AiOutlineFundView } from 'react-icons/ai'
import './style.css'
import { getClients } from '../../Server/Clients'

const Tiles = () => {
    const [clientAmount, setClientAmount] = useState('...')
    const [monthSales, setMonthSales] = useState('...')
    const [generalView, setGeneralView] = useState('...')

    getClients().then(response => {
        setClientAmount(response.size)
    })
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const date = new Date()
    const thisMonthName = months[date.getMonth()]
    const year = date.getFullYear()
    return <div id='overviewTiles'>
        <div className="tile">
            <span className="tileTitle">Média geral de visualizações</span>
            <div>
                <span className="tileIcon"><AiOutlineFundView /></span>
                <span className="tileInner">{generalView}</span>
            </div>
        </div>
        <div className="tile">
            <span className="tileTitle">Clientes Cadastrados</span>
            <div>
                <span className="tileIcon"><RiFolderUserLine /></span>
                <span className="tileInner">{clientAmount}</span>
            </div>
        </div>
        <div className="tile">
            <span className="tileTitle">Vendas de {thisMonthName}/{year}</span>
            <div>
                <span className="tileIcon"><BsBagCheck /></span>
                <span className="tileInner">{monthSales}</span>
            </div>
        </div>
    </div>
}

export default Tiles