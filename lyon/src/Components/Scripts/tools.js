export function id(ID){
    return document.getElementById(ID);
}
export function clss(CLSS){
    return document.getElementsByClassName(CLSS);
}
export function screenAlert(msg, where){
    where.innerHTML = '';
    let scalert = document.createElement('div');
    scalert.innerHTML = msg;
    scalert.className = 'screenAlert';
    where.appendChild(scalert);
}