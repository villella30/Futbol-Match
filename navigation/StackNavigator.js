import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Post from '../screens/Posts/Post';
import AddPost from '../screens/Posts/AddPost.js'

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Post"
                component={Post}
                options={{ title: 'Post' }}
            />
            <Stack.Screen
                name="addPost"
                component={AddPost}
                options={{ title: 'AddPost' }}
            />
        </Stack.Navigator>
    );
}