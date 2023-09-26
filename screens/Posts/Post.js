import react from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import AddPost from './AddPost'

function Post({ navigation }) {
    return (
        <View style={styles.viewBody}>
            <Text>Subir Post!</Text>
            <Icon 
            type='material-community'
            name='plus'
            color='green'
            reverse
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate('addPost')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5,
    }
})

export default Post;