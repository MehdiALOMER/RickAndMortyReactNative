import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import Icon from '../shared/Icons';
import { ICharacter } from '@/types/dataTypes';
import { Alert } from 'react-native';
import { addFavoriteCharacterThunk, removeFavoriteCharacterThunk, toggleFavoriteCharacter } from '@/store/reducers';


interface Props {
    character: ICharacter,
    navigation: any
}



const CharacterItem = ({ character, navigation }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const favoriteCharacterList: ICharacter[] = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacterList || []);


    const goToCharacterDetail = (character: ICharacter) => {
        navigation.navigate('CharacterDetailScreen', { character });
    }



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
        <GenericView backgroundColor={colors.primaryLight} margin={dWidth * .0125} padding={dWidth * .025} borderRadius={5}>
            <GenericView padding={dWidth * .0125}>
                <GenericTouchableOpacity
                    onPress={goToCharacterDetail.bind(this, character)}
                >
                    <GenericView>
                        <GenericImage source={{ uri: character.image }} resizeMode={"cover"} width={dWidth * .3875} height={dWidth * .3875} />
                    </GenericView>
                    <GenericTouchableOpacity
                        onPress={addAndRemoveFavoriteCharacter.bind(this, character)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 3
                        }}
                    >
                        <Icon name={character.isFavourite ? 'heart' : 'heart-outline'} size={40} color={colors.primary} />
                    </GenericTouchableOpacity>
                    <GenericView marginTop={dWidth * .025} center>
                        <GenericText color={colors.black} fontSize={16} bold numberOfLines={1}>{character.name.length > 15 ? character.name.substring(0, 15) + '...' : character.name}</GenericText>
                    </GenericView>
                </GenericTouchableOpacity>
            </GenericView>
        </GenericView>

    )
}

export default CharacterItem;