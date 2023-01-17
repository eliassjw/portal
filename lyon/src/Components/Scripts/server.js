function pingServer(){
    $.post('http://localhost/lyon/php/checklist.php', (response) => {
        console.log(response);
    })
}

function registerClient(data){
    id('registering').querySelector('button').disabled = true;
    $.post('http://localhost/lyon/php/Server/registerClient.php', data, (response) => {
        if (Number(response)) {
            id('congratsMessage').querySelector('span').innerHTML = data.nome;
            succeedRegister();
            log_inClient(response);
        } else console.log(response);
    })
}
function connectClient(data){
    id('login').querySelector('button').disabled = true;
    $.post('http://localhost/lyon/php/Server/connectClient.php', data, (response) => {
        if(Number(response)) log_inClient(response); else {
            declineLogin();
            console.log(response);
        }
    })
}
function log_inClient(data){
    localStorage.setItem('clientID', data);
    setTimeout(() => {location.href = 'http://localhost/lyon'}, 3000);
}
