import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { EpisodeDetailService } from '@/services/episodeDetailService';
import { ICharacter, IEpisode } from '@/types/dataTypes';
import { StorageService } from '@/utils/storage';


const getEpisodeDetailThunk = createAsyncThunk("episode/detail", async ({ id, navigation, dispatch }: { id: number, navigation: any, dispatch: any }) => {
    dispatch(setLoading(true));
    let response = await EpisodeDetailService.getEpisodeDetail(id);

    if (response?.status === 200) {
        dispatch(setLoading(false));
        navigation.navigate('EpisodeDetailScreen');
        return response?.data;
    } else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});
const getCharacterDetailsThunk = createAsyncThunk("characters/getDetails", async (characterUrls: string[], { dispatch }) => {
    dispatch(setLoading(true));
    try {
        const response = await EpisodeDetailService.getCharacterDetails(characterUrls);
        // sadece karakterlerin detaylarını almak için data kısmını map ediyoruz çünkü response içinde headers ve status gibi bilgiler de var
        const array = response.map((item: any) => item.data);
        // her bir karakterin detayına isFavourite keyi ekliyoruz
        let favoriteData = await StorageService.getItem('favoriteData');
        let characters = [];
        if (favoriteData) {
            let data = JSON.parse(favoriteData);
            characters = array.map((character: any) => {
                let index = data.findIndex((x: any) => x.id === character.id);
                if (index !== -1) {
                    return { ...character, isFavourite: true };
                } else {
                    return { ...character, isFavourite: false };
                }
            });
        }
        else {
            characters = array.map((character: any) => {
                return { ...character, isFavourite: false };
            });
        }

        dispatch(setLoading(false));
        return characters;
    } catch (error) {
        dispatch(setLoading(false));
        return Promise.reject(error);
    }
});


const episodeDetailSlice = createSlice({
    name: 'episode',
    initialState: {
        status: 'idle',

        episode: {} as IEpisode,
        characterList: [] as ICharacter[]
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getEpisodeDetailThunk.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getEpisodeDetailThunk.fulfilled, (state, action) => {
            state.status = 'success';
            state.episode = action.payload;
        });
        builder.addCase(getEpisodeDetailThunk.rejected, (state, action) => {
            state.status = 'failed';
        });
        builder.addCase(getCharacterDetailsThunk.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getCharacterDetailsThunk.fulfilled, (state, action) => {
            state.status = 'success';
            state.characterList = action.payload;
        });
        builder.addCase(getCharacterDetailsThunk.rejected, (state, action) => {
            state.status = 'failed';
        });
    }
});

export const { } = episodeDetailSlice.actions;

export { getEpisodeDetailThunk, getCharacterDetailsThunk };

export default episodeDetailSlice.reducer;