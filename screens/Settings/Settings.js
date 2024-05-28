import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';


import UserLogged from './UserLogged'
import UserGuest from './UserGuest'
import Loading from './Login'

import { getCurrentUser, isUserLogged } from '../../utils/actions';

export default function Settings() {
    const [login, setLogin] = useState(null)

    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    return login ? <UserLogged /> : <UserGuest />

}

const styles = StyleSheet.create({})