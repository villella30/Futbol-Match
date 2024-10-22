import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Modal({ isVisible, setVisible, children }) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setVisible(false)}
        >
            {
                children
            }

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: "90%"
    }
})