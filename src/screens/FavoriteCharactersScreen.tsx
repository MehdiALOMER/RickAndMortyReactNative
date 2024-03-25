import React from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ICharacter } from '@/types/dataTypes';
import { RootState } from '@/store';
import CharacterItem from '@/components/home/CharacterItem';
import { dWidth } from '@/constants';


const FavoriteCharactersScreen: React.FC = ({ navigation }: any) => {

    const favoriteCharacterList: ICharacter[] = useSelector((state: RootState) => state.favoriteCharacterReducer.favoriteCharacterList || []);


    const renderItem = ({ item }: { item: ICharacter }) => {
        return <CharacterItem character={item} navigation={navigation} />;
    };

    return (
        <SafeAreaWrapper>
            <AppHeader title="Favori Karakterler" />
            <GenericView flex={1} padding={dWidth * .0125}>
                <GenericView>
                    <FlatList
                        numColumns={2}
                        data={favoriteCharacterList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString() + ':' + index}
                    />
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );
};

export default FavoriteCharactersScreen; 