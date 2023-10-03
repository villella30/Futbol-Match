import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import StackNavigator from './PostStack'
import HomeScreen from '../screens/Home/HomeScreen';
import Community from '../screens/Community/Community';
import Notification from '../screens/Notification/Notification';
import Settings from '../screens/Settings/Settings';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <NavigationContainer>

            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarShowLabel: false,
                        headerTintColor: 'green',
                        tabBarIcon: () => (
                            <Entypo name="home" size={30} color="green" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Community"
                    component={Community}
                    options={{
                        tabBarShowLabel: false,
                        headerTintColor: 'green',
                        tabBarIcon: () => (
                            <FontAwesome5 name="users" size={30} color="green" />
                        ),
                    }} />
                <Tab.Screen
                    name="+"
                    component={StackNavigator}
                    options={{
                        tabBarShowLabel: false,
                        headerTintColor: 'green',
                        tabBarIcon: () => (
                            <Ionicons name="add-circle-sharp" size={32} color="green" />),
                    }} />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        tabBarShowLabel: false,
                        headerTintColor: 'green',
                        tabBarIcon: () => (
                            <Ionicons name="notifications" size={30} color="green" />
                        ),
                    }} />
                <Tab.Screen
                    name="Cuenta"
                    component={AccountStack}
                    options={{
                        tabBarShowLabel: false,
                        headerTintColor: 'green',
                        tabBarIcon: () => (
                            <Ionicons name="settings" size={30} color="green" />
                        ),
                    }} />
            </Tab.Navigator>
        </NavigationContainer>

    );
}