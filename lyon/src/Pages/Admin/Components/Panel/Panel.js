import Header from '../Header/Header'
import Menu from '../Menu/Menu'
import './panelPage.scss'

const AdministrationPanel = props => {
    return (
        <div id='panelPage'>
            <Menu tabID={props.tabID} />
            <div id="block">
                <Header title={props.title} />
                <div id="mainPanel">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AdministrationPanel