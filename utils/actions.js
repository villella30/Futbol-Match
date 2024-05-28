import { firebaseApp } from '../firebase';
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false;
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async(email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya fue registrado"
    }
    return result
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Email o Contraseña no válidos"
    }
    return result
}