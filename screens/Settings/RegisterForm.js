import { set, size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import  Loading  from '../../components/Loading'
 

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doRegisterUser = async () => {
        if (!validateData()) {
            return;
        }
        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            return;
        }

        navigation.navigate("settings")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorConfirm("")
        setErrorPassword("")
        let isValid = true;

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email válido");
            isValid = false;
        }

        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres")
            isValid = false;
        }

        if (size(formData.confirm) < 6) {
            setErrorPassword("Debes ingresar una confirmación de al menos 6 caracteres")
            isValid = false;
        }

        if (formData.password !== formData.confirm) {
            setErrorPassword("La contraseña y la confirmacion no son iguales")
            setErrorConfirm("La contraseña y la confirmacion no son iguales")
            isValid = false;
        }

        return isValid
    }

    return (
        <View style={styles.form}>
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
            <Input
                containerStyle={styles.input}
                placeholder='Registra tu contraseña'
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
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
                title='Registrarse'
                containerStyle={styles.containerBtn}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />
            <Loading 
            isVisible={loading}
            />

        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "",
        password: "",
        confirm: ""
    }
}


const styles = StyleSheet.create({
    form: {
        marginTop: 50,
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