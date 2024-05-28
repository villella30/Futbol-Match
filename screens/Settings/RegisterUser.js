import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RegisterForm from './RegisterForm'

export default function RegisterUser() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/juice.jpg")}
        resizeMode='contain'
        style={styles.image}
      />
      <RegisterForm />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: '100%',
    marginBottom: 20
  },
})