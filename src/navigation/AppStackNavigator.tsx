import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import { CharacterDetailScreen, EpisodeDetailScreen } from '@/screens';
import { ICharacter } from '@/types/dataTypes';


export type RootStackParamList = {
    BottomTabNavigator: undefined;
    EpisodeDetailScreen: undefined;
    CharacterDetailScreen: { character: ICharacter }
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
            <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;