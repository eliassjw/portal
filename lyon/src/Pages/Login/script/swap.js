export default function changeRegistration(){
    document.getElementById('logreg').scrollTop = (document.getElementById('logreg').scrollTop > 0 ? 0 : document.getElementById('logreg').scrollHeight);
}