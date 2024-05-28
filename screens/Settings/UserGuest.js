import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView
      centerContent
      style={styles.viewBody}
    >
      <Image
        source={require("../../assets/GuestImage.png")}
        style={styles.image}
      />
      <Text style={styles.title}>¡Consulta tu perfil de Futbol Match!</Text>
      <Text style={styles.description}>¿Queres jugar y no tenes equipo? ¿Tenes equipo pero te falta uno? Encontralo aca</Text>
      <Button
        buttonStyle={styles.button}
        title="Entrar a tu cuenta"
        onPress={() => navigation.navigate('login')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 10,
    verticalAlign: 'middle'
  },
  image: {
    height: 400,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginVertical: 10,
    textAlign: 'center'
  },
  description: {
    textAlign: 'justify',
    marginBottom: 20,
    color: 'green'
  },
  button: {
    backgroundColor: '#008000',

  },
}) 