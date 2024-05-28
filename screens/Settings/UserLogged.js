import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import Loading from '../../components/Loading'
import InfoUser from './InfoUser'

export default function UserLogged() {
  const toastRef = useRef();
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(()=>{
    setUser(getCurrentUser)
  },[])

  return (
    <View style={styles.container}>
      {
        user && <InfoUser user={user} />
      }


      <Text style={{ marginTop: 20 }}>AccountOptions</Text>

      <Button
        buttonStyle={styles.btnClose}
        titleStyle={styles.btnCloseTitle}
        title="Cerrar sesión"
        onPress={() => {
          closeSession()
          navigation.navigate("login")
        }
        }
      />
      <Toast ref={toastRef} position='center' opacity={0.9} />
      <Loading isVisible={loading} /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "f9f9f9"
  },
  btnClose: {
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    borderRadius: 5,
    borderTopWidth: 1,
    borderTopColor: 'green',
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    paddingVertical: 10
  },
  btnCloseTitle:{
    color: 'green'
  }
})