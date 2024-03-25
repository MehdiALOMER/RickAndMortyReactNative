import React, { useCallback, useEffect } from 'react';
import SafeAreaWrapper from '@/components/shared/SafeAreaWrapper';
import { GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css';
import AppHeader from '@/components/shared/AppHeader';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { EpisodeResponseInfo, IEpisode } from '@/types/dataTypes';
import EpisodeItem from '@/components/home/EpisodeItem';
import { getEpisodeListThunk, seacrhEpisodeList, setfavoriteCharacterList } from '@/store/reducers';
import { StorageService } from '@/utils/storage';
import SearchBar from '@/components/home/SearchBar';
import { dWidth } from '@/constants';


const HomeScreen: React.FC = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const displayEpisodeList: IEpisode[] = useSelector((state: RootState) => state.episodeReducer.displayEpisodeList || []);
    const episodeResponseInfo: EpisodeResponseInfo = useSelector((state: RootState) => state.episodeReducer.EpisodeResponseInfo || {});


    useEffect(() => {
        setFavoriteCharacterList();
        dispatch(getEpisodeListThunk({ page: 1 }));
    }, []);


    const loadMore = () => {
        // eğer episodeResponseInfo.next null değilse yani bir sonraki sayfa varsa
        if (episodeResponseInfo.next) {
            dispatch(getEpisodeListThunk({ page: parseInt(episodeResponseInfo.next.split('=')[1]) }));
        }
    }
    const searchEpisodeList = useCallback((query: string) => {
        dispatch(seacrhEpisodeList(query));
    }, []);

    const setFavoriteCharacterList = async () => {
        const favoriteData = await StorageService.getItem('favoriteData');
        if (favoriteData) {
            dispatch(setfavoriteCharacterList(JSON.parse(favoriteData)));
            console.log("favoriteData ::::: ", JSON.parse(favoriteData));
        }
    }


    const renderItem = ({ item }: { item: IEpisode }) => {
        return <EpisodeItem episode={item} navigation={navigation} />;
    };

    return (
        <SafeAreaWrapper>
            <AppHeader title="Rick and Morty" />
            <GenericView flex={1} padding={dWidth * 0.0125}>
                <GenericView padding={dWidth * 0.0125}>
                    <SearchBar search={searchEpisodeList} />
                </GenericView>
                <GenericView>
                    <FlatList
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        data={displayEpisodeList}
                        renderItem={renderItem}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                    />
                </GenericView>
            </GenericView>
        </SafeAreaWrapper>
    );



};

export default HomeScreen; 