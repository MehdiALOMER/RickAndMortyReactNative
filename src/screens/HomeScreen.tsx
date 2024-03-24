import React, { useEffect } from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { EpisodeResponseInfo, IEpisode } from '@/types/dataTypes';
import EpisodeItem from '@/components/home/EpisodeItem';
import { getEpisodeListThunk } from '@/store/reducers';


const HomeScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const displayEpisodeList: IEpisode[] = useSelector((state: RootState) => state.episodeReducer.displayEpisodeList || []);
    const episodeResponseInfo: EpisodeResponseInfo = useSelector((state: RootState) => state.episodeReducer.EpisodeResponseInfo || {});


    useEffect(() => {
        dispatch(getEpisodeListThunk());
    }, []);

    const loadMore = () => {
        // eğer episodeResponseInfo.next null değilse yani bir sonraki sayfa varsa
        if (episodeResponseInfo.next) {
            dispatch(getEpisodeListThunk());
        }
    }

    const renderItem = ({ item }: { item: IEpisode }) => {
        return <EpisodeItem episode={item} navigation={navigation} />;
    };

    return (
        <SafeAreaWrapper>
            <AppHeader title="Rick and Morty" />
            <GenericView flex={1} >
                <GenericView>
                    <FlatList
                        numColumns={2}
                        data={displayEpisodeList}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString() + ':' + index}
                    /* onEndReached={loadMore} */
                    />
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );



};

export default HomeScreen; 