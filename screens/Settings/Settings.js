import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { firebaseApp } from '../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import UserLogged from './UserLogged'
import UserGuest from './UserGuest'
import { isUserLogged } from '../../utils/actions';

export default function Settings() {
    const [login, setLoggin] = useState(null)

    useEffect(() => {
        setLoggin(isUserLogged)
    })

    if (login == null) {
        return (
            <Text style={{ marginTop: 20 }}>Cargando...</Text>
        );
    }
    return login ? <UserLogged /> : <UserGuest />

}

const styles = StyleSheet.create({})