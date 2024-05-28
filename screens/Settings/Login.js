import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import LoginForm from './LoginForm'

export default function Login() {

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../assets/juice.jpg")}
                resizeMode='contain'
                style={styles.image}
            />
            <View style={styles.container}>
                <LoginForm />
                <CreateAccount />
            </View>
            <Divider style={styles.divider} />
        </KeyboardAwareScrollView>
    )
}

const CreateAccount = (props) => {
    const navigation = useNavigation()

    return (
        <Text style={styles.register}
            onPress={() => navigation.navigate('register')}
        >
            ¿Aún no tienes cuenta? {" "}
            <Text style={styles.btnRegister} >
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: '100%',
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40,

    },
    divider: {
        backgroundColor: 'green',
        margin: 40,
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    btnRegister: {
        color: 'green',
        fontWeight: 'bold',
    }
})