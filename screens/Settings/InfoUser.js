import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'

export default function InfoUser({ user }) {
  return (
    <View style={styles.container} >
        <Avatar 
        rounded
        size="large"
        source={
            user.photoUrl
            ? { uri: photoUrl }
            :require("../../assets/default-user-icon-8.jpg")
        }
        />
        <View>
            <Text>
                {
                    user.displayName ? user.displayName : "Anónimo"
                }
            </Text>
            <Text>{user.email}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'f9f9f9',
        paddingVertical: 30
    },
    avatar: {

    }
})