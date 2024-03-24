import React from "react"               // Badge Kullanıldığı için eklenmiştir.
import AppStackNavigator from "./AppStackNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { DefaultTheme, PaperProvider } from "react-native-paper"

const theme = {  // aktif tabı saran container'ın rengini değiştirmek için kullanılmıştır (https://stackoverflow.com/questions/75013007/how-to-remove-this-white-ovale-behind-the-focused-in-the-material-bottom-tabs-na).
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        secondaryContainer: 'transparent', // Use transparent to disable the little highlighting oval
    },
};

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <AppStackNavigator />
            </PaperProvider>
        </NavigationContainer>
    )
}

export default MainNavigator;