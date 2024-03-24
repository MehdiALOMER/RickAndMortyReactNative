import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { EpisodeDetailScreen } from '@/screens';


export type RootStackParamList = {
    BottomTabNavigator: undefined;
    EpisodeDetailScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();



const AppStackNavigator = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator
            /* initialRouteName="AppStackNavigator" */
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
            <Stack.Screen name="EpisodeDetailScreen" component={EpisodeDetailScreen} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;