import { useEffect, useState } from "react"
import AdministrationPanel from "../../Components/Panel/Panel"
import { getClients } from "../../Server/Clients"
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import './style.scss'
import { GrFilter } from 'react-icons/gr'
const Clients = () => {
    const [clientsTable, setClientsTable] = useState([])
    const [filterLabel, setFilterLabel] = useState(<><GrFilter /> Filtro</>)
    useEffect(() => {
        const loadClients = async () => {
            const clientsList = await getClients()
            setClientsTable([])
            clientsList.forEach((list) => {
                setClientsTable(prev => prev.concat(
                    <tr key={list.id}>
                        <td><button className="edit_button"><FaRegEdit /></button><button className="delete_button"><FaTrashAlt /></button></td>
                        <td className='verifiedEmail'></td>
                        <td>{prev.length + 1}</td>
                        <td>{list.data().name.slice(0, 1).toUpperCase() + list.data().name.slice(1).toLowerCase()}</td>
                        <td>{list.data().lastName.slice(0, 1).toUpperCase() + list.data().lastName.slice(1).toLowerCase()}</td>
                        <td>{list.data().email}</td>
                        <td>0</td>
                        <td>0</td>
                    </tr>
                ))
            })
        }
        loadClients()
    }, [])

    return <AdministrationPanel title='Clientes' tabID={1}>
        <div id="clients">
            <div id="registeredClients">
                <h2>Clientes Cadastrados</h2>
                <div id="actions">
                    <div id='filter'>
                        <button>{filterLabel}</button>
                        <div id="filter_options">
                            <div className="filter_option">ID</div>
                            <div className="filter_option">Verificado</div>
                            <div className="filter_option">Não Verificado</div>
                            <div className="filter_option">Nome</div>
                            <div className="filter_option">Sobrenome</div>
                        </div>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Ações</th>
                            <th>Verificado</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Email</th>
                            <th>Compras Concluídas</th>
                            <th>Compras Pendentes</th>
                        </tr>
                        {clientsTable}
                    </tbody>
                </table>
            </div>
        </div>
    </AdministrationPanel>
}

export default Clients