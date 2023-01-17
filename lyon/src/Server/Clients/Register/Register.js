import { db } from '../../firebase'
import { addDoc, collection, getDocs, limit, where, query } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { FaLock, FaUserAlt } from 'react-icons/fa'
import { IoCalendar, IoCheckmarkOutline, IoCheckmark } from 'react-icons/io5'
import { MdErrorOutline } from 'react-icons/md'
import changeRegistration from '../../../Pages/Login/script/swap'
import { SiMaildotru } from 'react-icons/si'
import { ClientDataRegistrationContext } from '../../../Contexts/registrationData'
import { RiLoader3Line } from 'react-icons/ri'


export const checkExistentEmail = async (mail) => {
    const checkingEmail = await getDocs(query(
        collection(db, 'clients'),
        where('email', '==', mail),
        limit(1)
    ))
    if (checkingEmail.docs.length > 0) return [checkingEmail.docs[0].id, checkingEmail.docs[0].data()]; else return false;
    // return checkedEmail ? true : false
}
export const DeclinedAccCreation = (emailAlert) => {
    emailAlert('Este email já está sendo usado.')
}
export const AllowedAccCreation = async () => {
    const {firstName, secondName, birthday, email, password} = useContext(ClientDataRegistrationContext)
    try{
        await addDoc(collection(db, 'clients'), {
            name: firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase(),
            lastName: secondName.slice(0, 1).toUpperCase() + secondName.slice(1).toLowerCase(),
            birthday: birthday,
            email: email.toLowerCase(),
            password: password,
            verified: false
        })
        console.log('New account created.')
    }catch(error){
        console.log('Something went wrong. Message: '+ error)
    }
}

const RegisterTab = () => {
    const { firstName, secondName, birthday, email, password,
        setFirstName, setSecondName, setBirthday, setEmail, setPassword } = useContext(ClientDataRegistrationContext)

    const [nameStamp, updateNameStamp] = useState('')
    const [lastNameStamp, updateLastNameStamp] = useState('')
    const [birthdayStamp, updateBirthdayStamp] = useState('')
    const [emailStamp, updateEmailStamp] = useState('')
    const [passwordStamp, updatePasswordStamp] = useState('')
    const [confirmPasswordStamp, updateConfirmPasswordStamp] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [confirmPassword, setConfirmPassword] = useState([]);

    const [registerButtonLabel, setRegisterButtonLabel] = useState('Cadastrar');

    const handleSubmit = e => {
        e.preventDefault()
        if (checkAllInputs()) {
            setEmailAlert('')
            setRegisterButtonLabel(<span className='loading'><RiLoader3Line /></span>)
            document.getElementById('registering').querySelector('button[type="submit"]').disabled = true
            checkExistentEmail(document.getElementById('inputEmail').value).then((response) => {
                if(response) DeclinedAccCreation(setEmailAlert); else AllowedAccCreation()
                setRegisterButtonLabel('Cadastrar')
            })
        }
    }
    const checkAllInputs = () => {
        const pwd = document.getElementById('inputSenha').value;
        const cpwd = document.getElementById('inputCSenha').value;
        if (!document.getElementById('inputNome').value || !document.getElementById('inputSobrenome').value || !document.getElementById('inputNascimento').value || !checkEmailAuthenticy(document.getElementById('inputEmail').value) ||
            !checkPasswordStrongness(pwd, true) || !checkSamePassword(cpwd, pwd) ||
            !document.getElementById('acceptTerms').checked) {
                document.getElementById('registering').querySelector('button[type="submit"]').disabled = true;
                return;
            }
            document.getElementById('registering').querySelector('button[type="submit"]').disabled = false;
        return true;
    }
    const checkSamePassword = (confirmedPassword, inputedPassword) => {
        return checkPasswordStrongness(inputedPassword, true) && confirmedPassword === inputedPassword;
    }
    const checkEmailAuthenticy = inputedEmail => {
        const emailAuthenticyTest = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return emailAuthenticyTest.test(inputedEmail);
    }
    const checkPasswordStrongness = (inputedPassword, skipCheck = false) => {
        const passwordBoldness = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        const passwordTest = passwordBoldness.test(inputedPassword);
        if (typeof confirmPassword == 'string') {
            if(!skipCheck) {
                checkInput(document.getElementById('inputCSenha'), setConfirmPassword, updateConfirmPasswordStamp, (inputedPassword === document.getElementById('inputCSenha').value && passwordTest))
            }
        }
        return passwordTest;
    }
    const checkInput = (inp, updateInput, updateStamp, forcedValidation = undefined) => {
        if ((inp.value !== '' && forcedValidation === undefined) ||
            forcedValidation) updateStamp(<IoCheckmark />); else updateStamp(<MdErrorOutline />);
        updateInput(inp.value);
    }
    return (
        <div id="register">
            <div id="registering">
                <span className="title">Cadastre-se</span>
                    <form onChange={checkAllInputs} onSubmit={handleSubmit}>
                        <div id="nomeSobrenome">
                            <div id="nome" className="input_area">
                                <label htmlFor="inputNome" className="inputIcon"><FaUserAlt /></label>
                                <input type="text" placeholder='Nome' id="inputNome" value={firstName} onChange={e => {checkInput(e.target, setFirstName, updateNameStamp)}} />
                                <span className="stamp">{nameStamp}</span>
                            </div>
                            <div id="sobrenome" className="input_area">
                                <input type="text" placeholder="Sobrenome" id="inputSobrenome" value={secondName} onChange={e => {checkInput(e.target, setSecondName, updateLastNameStamp)}} />
                                <span className="stamp">{lastNameStamp}</span>
                            </div>
                        </div>
                        <div id="nascimento" className="input_area">
                            <label htmlFor="inputNascimento" className="inputIcon" title="Data de nascimento"><IoCalendar /></label>
                            <input type="date" id="inputNascimento" name="inputNascimento" value={birthday} onChange={e => {checkInput(e.target, setBirthday, updateBirthdayStamp)}} />
                            <span className="stamp">{birthdayStamp}</span>
                        </div>
                        <div id="email" className="input_area">
                            <label htmlFor="inputEmail" className="inputIcon"><SiMaildotru /></label>
                            <input type="email" id="inputEmail" placeholder="Email" value={email} onChange={e => {
                                setEmailAlert('')
                                checkInput(e.target, setEmail, updateEmailStamp, checkEmailAuthenticy(e.target.value))
                            }} />
                            <span className="stamp">{emailStamp}</span>
                            <span className="existentEmail">{emailAlert}</span>
                        </div>
                        <div id="senha" className="input_area">
                            <label htmlFor="inputSenha" className="inputIcon"><FaLock /></label>
                            <input type="password" id="inputSenha" placeholder="Senha" value={password} onChange={e => {checkInput(e.target, setPassword, updatePasswordStamp, checkPasswordStrongness(e.target.value))}} />
                            <span className="stamp">{passwordStamp}</span>
                        </div>
                        <div id="csenha" className="input_area">
                            <label htmlFor="inputCSenha" className="inputIcon"><FaLock /><IoCheckmarkOutline /></label>
                            <input type="password" id="inputCSenha" placeholder="Confirme sua senha" value={confirmPassword} onChange={e => {checkInput(e.target, setConfirmPassword, updateConfirmPasswordStamp, checkSamePassword(e.target.value, document.getElementById('inputSenha').value))}} />
                            <span className="stamp">{confirmPasswordStamp}</span>
                        </div>
                        <label htmlFor="acceptTerms" id="acceptPolicy"><input id="acceptTerms" type="checkbox" value="accepted" />Ao me cadastrar, declaro que li e concordo com os termos de uso e a política de privacidade do Lyon Grifes.</label>
                        <div className="scalert"></div>
                        <button type="submit" title="Cadastre-se" disabled>{registerButtonLabel}</button>
                    </form>
                <div id="alreadyHaveAccount" onClick={() => {
                    document.getElementById('logreg').style.height = ''
                    document.getElementById('backHome').style.top = ''
                    changeRegistration();
                }}>Já tem uma conta? <span>Faça login.</span></div>
            </div>
            <div id="registered">
                <div id="succeedLogo">
                    <i className="fi fi-rr-shopping-bag"></i>
                    <i className="fi fi-ts-sparkles"></i>
                </div>
                <h1>Bem-vindo!</h1>
                <p id="congratsMessage">
                    Parabéns <span>{firstName}</span>, agora você está cadastrado no Lyon Grifes!<br />Esperamos que você tenha uma ótima experiência
                    no nosso site.<br /><br />Boas compras!
                </p>
                <span id="redirectMessage">Você será redirecionado em alguns segundos...</span>
            </div>
        </div>
    )
}

export default RegisterTab