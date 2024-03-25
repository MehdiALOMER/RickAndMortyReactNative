import React, { useEffect } from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { ICharacter, IEpisode } from '@/types/dataTypes';
import { getCharacterDetailsThunk } from '@/store/reducers';
import { FlatList } from 'react-native';
import CharacterItem from '@/components/home/CharacterItem';
import { dWidth } from '@/constants';
import moment from 'moment';


const EpisodeDetailScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const episode: IEpisode = useSelector((state: RootState) => state.episodeDetailReducer.episode || {});
    const characterList: ICharacter[] = useSelector((state: RootState) => state.episodeDetailReducer.characterList || []);

    useEffect(() => {
        // karakterlerin detaylarını almak için getCharacterDetailsThunk fonksiyonunu çağırıyoruz
        dispatch(getCharacterDetailsThunk(episode.characters));
    }, [episode.characters]);

    const onPressBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }: { item: ICharacter }) => {
        return <CharacterItem character={item} navigation={navigation} />;
    };

    return (
        <SafeAreaWrapper>
            <AppHeader title={episode.name} back onPressBack={onPressBack} />
            <GenericView flex={1} padding={dWidth * .0125}>
                <GenericView padding={dWidth * .0125}>
                    <GenericText>Yayın Tarihi: {episode.air_date}</GenericText>
                </GenericView>
                <GenericView padding={dWidth * .0125}>
                    <GenericText>Oluşturma Tarihi: {moment(episode.created).format('DD.MM.YYYY')}</GenericText>
                </GenericView>
                <GenericView padding={dWidth * .0125}>
                    <GenericText>Episode: {episode.episode}</GenericText>
                </GenericView>
                <GenericView padding={dWidth * .0125}>
                    <GenericText>Karakterler:</GenericText>
                </GenericView>
                <GenericView>
                    <FlatList
                        numColumns={2}
                        data={characterList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString() + ':' + index}
                    />
                </GenericView>

            </GenericView>
        </SafeAreaWrapper>
    );
};

export default EpisodeDetailScreen; 