import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen, FavoriteCharactersScreen } from '@/screens';
import { colors } from '@/constants';
import Icon from '@/components/shared/Icons';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
/* import { Badge } from 'native-base'; */
import { useNavigationContainerRef } from '@react-navigation/native';


const BottomTab = createMaterialBottomTabNavigator();



export default function BottomTabNavigator() {

    const favoriteCount = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacterList.length || 0);

    const barColors = {
        home: colors.primary,
        favorite: colors.black
    };

    const [tab, setTab] = React.useState<keyof typeof barColors>('home');
    const navRef = useNavigationContainerRef();
    React.useEffect(() => {
        const unsubscribe = navRef.addListener('state', () => {
            const currRoute = navRef.getCurrentRoute();
            if (currRoute) {
                // A work-around to set background color for the bar after the ripple
                // effect completes. The 200 ms delay comes from trial and error
                setTimeout(() => setTab(currRoute.name as keyof typeof barColors), 200);
            }
        });
        return unsubscribe;
    });


    return (
        <BottomTab.Navigator
            initialRouteName="HomeScreen"
            shifting={true}
            activeColor={colors.white}
            barStyle={{
                backgroundColor: barColors[tab],
            }}
        >
            <BottomTab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarColor: barColors.home,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Icon name="home" size={35} color={focused == true ? colors.white : colors.gray} />
                    )
                }}
            />
            <BottomTab.Screen
                name="FavoriteCharactersScreen"
                component={FavoriteCharactersScreen}
                options={{
                    tabBarBadge: favoriteCount > 0 ? favoriteCount : false,
                    tabBarColor: barColors.favorite,
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Icon name="heart" size={33} color={focused == true ? colors.white : colors.gray} />
                            {/* {
                                cartCount > 0 &&
                                <Badge
                                    style={[styles.badge,
                                    {
                                        height: cartCount > 9 ? dHeight * 0.039 : dHeight * 0.032,
                                        width: cartCount > 9 ? dHeight * 0.039 : dHeight * 0.032,
                                        borderRadius: Math.round((dHeight + dWidth) / 2),
                                        right: cartCount > 9 ? dWidth * .03 : dWidth * .001,
                                        top: cartCount > 9 ? dHeight * .0001 : dHeight * .00001
                                    }
                                    ]}
                                >
                                    <Text style={[styles.badgeText, { fontSize: cartCount > 9 ? dWidth * 0.025 : dWidth * 0.03 }]}>{cartCount}</Text>
                                </Badge>
                            } */}
                        </>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        top: -14,
        right: 3,
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
    },
    badgeText: {
        color: colors.white,
        textAlign: 'center'
    },
})