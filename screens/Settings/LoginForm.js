import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { size } from 'lodash'

import  Loading  from '../../components/Loading'
import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'



export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }


    const doLogin = async () => {
        if (!validateData()) {
            return;
        }
        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return;
        }

        navigation.navigate("settings")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true;

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email válido");
            isValid = false;
        }

        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña válida")
            isValid = false;
        }

        return isValid
    }


    return (
        <View style={styles.container}>
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu Email'
                keyboardType='email-address'
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder='Ingresa tu contraseña'
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title='Entrar'
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading
                isVisible={loading}
            />
        </View>
    );
}

const defaultFormValues = () => {
    return {
        email: "",
        password: "",
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    input: {
        width: '100%'
    },
    containerBtn: {
        marginTop: 20,
        width: '95%',
        alignSelf: 'center'
    },
    btn: {
        backgroundColor: 'green'
    },
    icon: {
        color: '#c1c1c1'
    }
})