import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import { RootStackParamList } from '@/navigation/AppStackNavigator';
import { RouteProp } from '@react-navigation/native';
import { colors, dHeight, dWidth } from '@/constants';
import Icon from '@/components/shared/Icons';
import { Alert, Linking } from 'react-native';
import moment from 'moment';
import { ICharacter } from '@/types/dataTypes';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCharacterThunk, removeFavoriteCharacterThunk, toggleFavoriteCharacter } from '@/store/reducers';


type CharacterDetailScreenRouteProp = RouteProp<RootStackParamList, 'CharacterDetailScreen'>;
interface Props {
    navigation: any;
    route: CharacterDetailScreenRouteProp
}

const CharacterDetailScreen: React.FC<Props> = ({ route, navigation }) => {

    const dispatch = useDispatch<AppDispatch>();

    const favoriteCharacterList: ICharacter[] = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacterList || []);

    const onPressBack = () => {
        navigation.goBack();
    };

    const openURL = (url: string) => {
        Linking.canOpenURL(url).then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    const addAndRemoveFavoriteCharacter = (character: ICharacter) => {

        if (character.isFavourite && favoriteCharacterList.length > 0) {
            // ... isimli karakteri favorilerden kaldırmak istediğinize emin misiniz
            Alert.alert('Uyarı', `${character.name} isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`, [
                {
                    text: 'Evet',
                    onPress: () => {
                        dispatch(toggleFavoriteCharacter(character.id));
                        dispatch(removeFavoriteCharacterThunk(character));
                    }
                },
                {
                    text: 'Hayır'
                }
            ])
        }
        else {
            // en fazla 10 karakter favorilere eklenebilir
            if (favoriteCharacterList.length < 10) {
                // ... isimli karakteri favorilere eklemek istediğinize emin misiniz
                Alert.alert('Uyarı', `${character.name} isimli karakteri favorilere eklemek istediğinize emin misiniz?`, [
                    {
                        text: 'Evet',
                        onPress: () => {
                            dispatch(toggleFavoriteCharacter(character.id));
                            dispatch(addFavoriteCharacterThunk(character));
                        }
                    },
                    {
                        text: 'Hayır'
                    }
                ])
            }
            else {
                Alert.alert('Uyarı', 'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
            }
        }


    }

    return (
        <SafeAreaWrapper>
            <GenericView flex={1} >
                <GenericView>
                    <GenericImage
                        source={{ uri: route.params.character.image }}
                        width={dWidth}
                        height={dHeight * .4}
                        resizeMode='cover'
                    />
                </GenericView>
                {/* geri düğmesi */}
                <GenericTouchableOpacity
                    onPress={() => {
                        onPressBack();
                    }}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: '#1d1e1c',
                        borderRadius: 30,
                        padding: 10,
                    }}
                >
                    <Icon name='arrow-back' size={30} type='Ionicons' color={colors.white} />
                </GenericTouchableOpacity>
                <GenericView padding={dWidth * .025}>
                    <GenericView>
                        <GenericText fontSize={20} bold >{route.params.character.name}</GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Durum: {route.params.character.status}</GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Tür: {route.params.character.species}</GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Cinsiyet: {route.params.character.gender}</GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Orijin: {route.params.character.origin.name} - <GenericText color={colors.info}
                            onPress={() => {
                                openURL(route.params.character.origin.url);
                            }}
                        >Daha fazla bilgi için bağlantı</GenericText></GenericText>
                    </GenericView>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Bölüm Sayısı: {route.params.character.episode.length}</GenericText>
                    </GenericView>
                    <GenericTouchableOpacity
                        marginTop={dWidth * .025}
                        onPress={() => {
                            openURL(route.params.character.url);
                        }}
                    >
                        <GenericText>Karakter URL: <GenericText color={colors.info}>{route.params.character.name} için tıklayınız</GenericText></GenericText>
                    </GenericTouchableOpacity>
                    <GenericView marginTop={dWidth * .025}>
                        <GenericText>Oluşturulma Tarihi: {moment(route.params.character.created).format('DD/MM/YYYY HH:mm:ss')}</GenericText>
                    </GenericView>
                </GenericView>
                <GenericView
                    position='absolute'
                    style={{
                        bottom: 10,
                    }}
                    marginLeft={dWidth * .025}

                >
                    <GenericTouchableOpacity
                        backgroundColor={colors.primary}
                        width={dWidth * .95}
                        borderRadius={30}
                        padding={dWidth * .05}
                        center
                        onPress={() => {
                            addAndRemoveFavoriteCharacter(route.params.character);
                        }}
                    >
                        <GenericText color={colors.white} bold>{route.params.character.isFavourite ? 'Favorilerimden Çıkar' : 'Favorilerime Ekle'}</GenericText>
                    </GenericTouchableOpacity>
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default CharacterDetailScreen; 