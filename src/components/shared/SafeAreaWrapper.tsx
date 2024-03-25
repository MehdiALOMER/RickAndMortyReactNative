import { GenericView } from "@/assets/css"
import { colors } from "@/constants"
import { RootState } from "@/store"
import React, { ReactNode } from "react"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import Loader from "./Loader"

type SafeAreaWrapperProps = {
    children: ReactNode
}

const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {

    const isLoading = useSelector((state: RootState) => state.loadingReducer.isLoading);


    return (
        <>
            <StatusBar
                barStyle="light-content"
                /* backgroundColor={colors.white} */
                hidden={true}   // status bar ı gizlemek için

            />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}
            >
                <GenericView flex={1} backgroundColor={colors.white}>
                    {
                        isLoading ?
                            <Loader />
                            :
                            children
                    }
                </GenericView>
            </SafeAreaView>
        </>

    )
}

export default SafeAreaWrapper