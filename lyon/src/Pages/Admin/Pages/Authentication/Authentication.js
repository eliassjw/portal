import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AdministrationLoginAuthContext } from "../../Contexts/adminAuth"
import './authPage.css'

const HeadquarterAuthentication = () => {
    const { authenticated } = useContext(AdministrationLoginAuthContext)

    if (!authenticated) {
        return <div id="authAdmin">
            <div id="authTemplate">
                <div id="login">
                    <h1>Administração</h1>
                    <form autoComplete="off">
                        <div className="login" id="user">
                            <label htmlFor="userInput">Autenticação</label>
                            <input type="text" id="userInput" autoComplete="off" onFocus={() => {
                                document.getElementById('user').querySelector('label').classList.add('activeLabel')
                                document.getElementById('user').querySelector('input').classList.add('activeInput')
                            }} onBlur={(e) => {
                                if (!e.target.value) {
                                    document.getElementById('user').querySelector('label').classList.remove('activeLabel')
                                    document.getElementById('user').querySelector('input').classList.remove('activeInput')
                                }
                            }} />
                        </div>
                        <div className="login" id="passcode">
                            <label htmlFor="passInput">Senha</label>
                            <input type="password" id="passInput" autoComplete="off" onFocus={() => {
                                document.getElementById('passcode').querySelector('label').classList.add('activeLabel')
                                document.getElementById('passcode').querySelector('input').classList.add('activeInput')
                            }} onBlur={(e) => {
                                if (!e.target.value) {
                                    document.getElementById('passcode').querySelector('label').classList.remove('activeLabel')
                                    document.getElementById('passcode').querySelector('input').classList.remove('activeInput')
                                }
                            }} />
                        </div>
                        <button type="submit" disabled>Acessar</button>
                    </form>
                </div>
                <div id="loginImage"></div>
            </div>
        </div>
    } else return <Navigate to='/administration/panel' />
}

export default HeadquarterAuthentication