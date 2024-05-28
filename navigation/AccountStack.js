import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Settings from '../screens/Settings/Settings'
import Login from '../screens/Settings/Login'
import RegisterUser from '../screens/Settings/RegisterUser'

const Stack = createStackNavigator()

export default function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='settings'
                component={Settings}
                options={{
                    title: 'Cuenta',
                    headerTintColor: 'green'
                }}
            />
            <Stack.Screen
                name='login'
                component={Login}
                options={{
                    title: 'Iniciar Sesión',
                    headerTintColor: 'green'
                }}
            />
            <Stack.Screen
                name='register'
                component={RegisterUser}
                options={{
                    title: 'Registrarse',
                    headerTintColor: 'green'
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})