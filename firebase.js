import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWcZVIwzWawie7tmnlUXIOsbQ4t91Vmbc",
    authDomain: "futbol-match-1a678.firebaseapp.com",
    projectId: "futbol-match-1a678",
    storageBucket: "futbol-match-1a678.appspot.com",
    messagingSenderId: "214378654115",
    appId: "1:214378654115:web:7cf9bc76a05dd8a3649216",
    measurementId: "G-RM8664HHDT"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)