import './login.css'
import { FaLock } from 'react-icons/fa'
import { SiMaildotru } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { RiLoader3Line } from 'react-icons/ri'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState  } from 'react'
import changeRegistration from './script/swap'
import { AuthEmailContext, AuthGoogleContext } from '../../Contexts/clientAuth'
import RegisterTab, { checkExistentEmail } from '../../Server/Clients/Register/Register'

function Login(){
    
    const { signedInWithEmail } = useContext(AuthEmailContext)
    const { signedInWithGoogle } = useContext(AuthGoogleContext)

    if (!signedInWithGoogle && !signedInWithEmail) {
        return (
            <div id="loginPage">
                <Link to="/"><span id="backHome">&larr; Voltar para a página inicial.</span></Link>
                <div id="logreg">
                    <LoginTab />
                    <RegisterTab />
                </div>
            </div>
        )
    } else {
        return <Navigate to='/' />
    }
}

const LoginTab = () => {


    const { logInWithGoogle } = useContext(AuthGoogleContext)
    const { logInWithEmail } = useContext(AuthEmailContext)

    const [loginEmailAlert, updateEmailLoginAlert] = useState('')
    const [loginPasswordAlert, updatePasswordLoginAlert] = useState('')
    const [loginButtonInner, updateLoginButton] = useState('Entrar')

    const handleLogin = e => {
        e.preventDefault()
        if (checkLogin()) {
            updateEmailLoginAlert('')
            updatePasswordLoginAlert('')
            updateLoginButton(<span className='loading'><RiLoader3Line /></span>)
            document.getElementById('login').querySelector('button[type="submit"]').disabled = true
            checkExistentEmail(document.getElementById('email_input').value).then((response) => {
                if (response) {
                    if (response[1].password === document.getElementById('pass_input').value) {
                        logInWithEmail(response[1])
                    } else updatePasswordLoginAlert('Senha invalida.')
                } else updateEmailLoginAlert('Este email não está cadastrado.')
                updateLoginButton('Entrar')
            })
        }
    }

    const checkLogin = () => {
        if (document.getElementById('email_input').value && document.getElementById('pass_input').value) {
            document.getElementById('login').querySelector('button[type="submit"]').disabled = false;
            return true
        }
        document.getElementById('login').querySelector('button[type="submit"]').disabled = true;
        return false
    }

    return (
        <div id="login">
            <span className="title">Login</span>
            <div id="loginWith">
                <button id="google" title='Login com o Google' onClick={logInWithGoogle}><span><FcGoogle /></span>Faça login com o Google</button>
            </div>
            <form onSubmit={handleLogin} onChange={checkLogin}>
                <div id="emailArea" className="input_area">
                    <label htmlFor="email_input" className="inputIcon" title="Email"><SiMaildotru /></label>
                    <input type="email" id="email_input" placeholder="Email" title="Email" />
                    <span className="loginAlert">{loginEmailAlert}</span>
                </div>
                <div id="passArea" className="input_area">
                    <label htmlFor="pass_input" className="inputIcon" title="Senha"><FaLock /></label>
                    <input type="password" id="pass_input" placeholder="Senha" title="Senha" />
                    <span className="loginAlert">{loginPasswordAlert}</span>
                </div>
                <div id="scalert"></div>
                <button type="submit" title="Entrar" disabled>{loginButtonInner}</button>
            </form>
            <p id="forgot"><Link to="/login/forgot">Esqueci minha senha</Link></p>
            <p id="regmsg" onClick={() => {
                document.getElementById('logreg').style.height = document.getElementById('registering').offsetHeight + 'px'
                document.getElementById('backHome').style.top = 'calc(50% - 335px)'
                changeRegistration();
            }}>Ainda não tem uma conta? <span id="logup">Cadastre-se.</span></p>
        </div>
    )
}

export default Login