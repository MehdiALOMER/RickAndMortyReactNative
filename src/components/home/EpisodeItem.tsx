import React from 'react'
import { GenericImage, GenericText, GenericTouchableOpacity, GenericView } from '@/assets/css'
import { colors, dHeight, dWidth } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { IEpisode } from '@/types/dataTypes';
import Icon from '../shared/Icons';
import { getEpisodeDetailThunk } from '@/store/reducers';


interface Props {
    episode: IEpisode,
    navigation: any
}



const EpisodeItem = ({ episode, navigation }: Props) => {

    const dispatch = useDispatch<AppDispatch>();

    const episodeList: IEpisode[] = useSelector((state: RootState) => state.episodeReducer.episodeList || []);


    const goToEpisodeDetail = (episode: IEpisode) => {
        dispatch(getEpisodeDetailThunk({ id: episode.id, navigation, dispatch }));
    }

    return (
        <GenericTouchableOpacity
            onPress={() => goToEpisodeDetail(episode)}
            width={dWidth * .46}
            backgroundColor={colors.primaryLight} margin={dWidth * .0125} padding={dWidth * .025} borderRadius={5}
        >
            <GenericView center>
                <GenericText color={colors.black} fontSize={16} bold numberOfLines={1}>{episode.name.length > 15 ? episode.name.substring(0, 15) + '...' : episode.name}</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * .0125}>
                <GenericText color={colors.primary}>Yayın Tarihi: {episode.air_date}</GenericText>
            </GenericView>
            <GenericView marginTop={dWidth * .0125}>
                <GenericText color={colors.primary}>Bölüm Kodu: {episode.episode}</GenericText>
            </GenericView>
        </GenericTouchableOpacity>

    )
}

export default EpisodeItem;