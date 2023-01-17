
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    databaseURL: 'https://lyon-grifes-default-rtdb.firebaseio.com',
    apiKey: "AIzaSyBon8lZgvQ0sg_-oGhb_dPvuzXCNwW_Y4c",
    authDomain: "lyon-grifes.firebaseapp.com",
    projectId: "lyon-grifes",
    storageBucket: "lyon-grifes.appspot.com",
    messagingSenderId: "148559184922",
    appId: "1:148559184922:web:e4c26840db65edc8fa7da3",
    measurementId: "G-YJB38N4P4D"
};

export const initializedApp = initializeApp(firebaseConfig);
export const db = getFirestore(initializedApp)