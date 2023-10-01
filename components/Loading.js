import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements';
import { View, Text } from 'react-native';

export default function loading({ isVisible, text }) {
    return(
        <Overlay
        isVisible = {isVisible}
        windowBackgroundColor = "rgba(0,0,0.5)"
        overlayBackgroundColor = "transparent"
        overlayStyle = {styles.overlay}
        >
        <View>
            <ActivityIndicator
            size='large'
            color="white"

            />
            {
                text && <Text>{ text }</Text>
            }
        </View>
        </Overlay>
        );
}


const styles = StyleSheet.create({
    overlay: {
        heigth: 100,
        width: 43,
        backgroundColor: 'transparent',
        borderRadius: 100
    },
})