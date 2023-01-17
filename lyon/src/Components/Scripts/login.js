function declineLogin(){
    screenAlert('Verifique email ou senha.', id('login').querySelector('#scalert'));
}
window.onload = () => {
    id('login').querySelector('button').addEventListener('click', checkLoginCredentials);
    id('logup').addEventListener('click', switchPage);
    id('alreadyHaveAccount').querySelector('span').addEventListener('click', switchPage);
    id('register').querySelector('button').addEventListener('click', checkRegisterCredentials);
    id('email_input').addEventListener('input', checkFormLogin);
    id('pass_input').addEventListener('input', checkFormLogin);
    for(let i = 0; i < clss('input_area').length; i++){
        clss('input_area')[i].querySelector('input').addEventListener('input', checkForm);
    }
    id('acceptTerms').addEventListener('change', checkForm);
    // switchPage();
    // setTimeout(succeedRegister, 400);
}
function checkLoginCredentials(){
    const loginForm = {
        email: id('email_input').value,
        pwd: id('pass_input').value
    }
    if (loginForm.email == '' || loginForm.pwd == '') declineLogin(); else connectClient(loginForm);
}
function checkFormLogin(){
    if (id('email_input').value == '' || id('pass_input').value == '') id('login').querySelector('button').disabled = true; else {
        id('login').querySelector('button').disabled = false;
    }
}
function checkForm(){
    if (id('inputNome').value == '' ||
        id('inputSobrenome').value == '' ||
        id('inputEmail').value == '' ||
        id('inputSenha').value == '' ||
        id('inputCSenha').value == '' ||
        id('inputNascimento').value == '' ||
        !id('acceptTerms').checked) id('registering').querySelector('button').disabled = true; else id('registering').querySelector('button').disabled = false;
}
function checkRegisterCredentials(){
    if (id('inputSenha').value != id('inputCSenha').value) {
        screenAlert('Suas senhas não batem. Corrija e tente novamente.', id('register').querySelector('.scalert'));
        return;
    }
    const user = {
        nome: id('inputNome').value,
        sobrenome: id('inputSobrenome').value,
        email: id('inputEmail').value,
        pwd: id('inputSenha').value,
        nascimento: id('inputNascimento').value
    };
    for(let i in user){
        if (user[i] == '') {
            screenAlert('Verifique se todos os campos estão preenchidos corretamente.', id('register').querySelector('.scalert'));
            return;
        }
    }
    registerClient(user);
}
function succeedRegister(){
    id('register').scrollLeft = id('register').scrollWidth;
}
function switchPage(){
    id('logreg').scrollTop = (id('logreg').scrollTop > 0 ? 0 : id('logreg').scrollHeight);
}