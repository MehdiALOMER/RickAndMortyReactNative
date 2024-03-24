import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { colors, dWidth } from '@/constants';
import Icon from '@/components/shared/Icons';


const FavoriteCharactersScreen: React.FC = ({ navigation }: any) => {

    const rightComponent = () => {
        return (
            <GenericView flexDirection='row'>
                <GenericView center >
                    <GenericTouchableOpacity
                        onPress={() => { }}
                        borderRadius={30}
                        backgroundColor={'red'}
                        padding={dWidth * .025}
                    >
                        <GenericText color={colors.white} bold>Giriş Yap</GenericText>
                    </GenericTouchableOpacity>
                </GenericView>
                <GenericView center >
                    <Icon name='person-circle' size={40} type='Ionicons' color={colors.black} />
                </GenericView>
            </GenericView>
        )
    }

    const leftComponent = () => {
        return (
            <GenericView>
                {/* <GenericImage source={logoImage} width={dWidth * .3} height={dWidth * .3} resizeMode='contain' /> */}
            </GenericView>
        )
    }

    return (
        <SafeAreaWrapper>
            <AppHeader rightComponent={rightComponent()} leftComponent={leftComponent()} />
            <GenericView flex={1} >

            </GenericView>
        </SafeAreaWrapper>
    );
};

export default FavoriteCharactersScreen; 