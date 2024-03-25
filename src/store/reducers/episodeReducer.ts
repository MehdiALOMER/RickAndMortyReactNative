import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading } from "./loadingReducer";
import { EpisodeService } from '@/services/episodeService';
import { EpisodeResponseInfo, IEpisode } from '@/types/dataTypes';


const getEpisodeListThunk = createAsyncThunk("episode/list", async ({ page }: { page: number }, { dispatch }) => {
    dispatch(setLoading(true));
    let response = await EpisodeService.getEpisodeList(page);

    if (response?.status === 200) {
        dispatch(setLoading(false));
        return response?.data;
    } else {
        dispatch(setLoading(false));
        return Promise.reject(response);
    }
});

const episodeSlice = createSlice({
    name: 'episode',
    initialState: {
        status: 'idle',

        episodeList: [] as IEpisode[],              // tüm bölüm listesi
        displayEpisodeList: [] as IEpisode[],       // sayfada gösterilecek bölüm listesi

        EpisodeResponseInfo: {
            count: 0,
            pages: 0,
            next: '',
            prev: '',
        } as EpisodeResponseInfo,
    },
    reducers: {
        seacrhEpisodeList: (state, action) => {
            state.displayEpisodeList = state.episodeList.filter((episode) => episode.name.toLowerCase().includes(action.payload.toLowerCase()));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEpisodeListThunk.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getEpisodeListThunk.fulfilled, (state, action) => {
            state.status = 'success';
            const newEpisodes = action.payload.results;
            state.episodeList = [...state.episodeList, ...newEpisodes];

            // Yalnızca yeni bölümler varsa displayEpisodeList'i güncelle
            if (newEpisodes.length > 0) {
                state.displayEpisodeList = [...state.displayEpisodeList, ...newEpisodes];
            }

            state.EpisodeResponseInfo = {
                count: action.payload.info.count,
                pages: action.payload.info.pages,
                next: action.payload.info.next,
                prev: action.payload.info.prev,
            };
        });
        builder.addCase(getEpisodeListThunk.rejected, (state, action) => {
            state.status = 'failed';
        });
    }
});

export const { seacrhEpisodeList } = episodeSlice.actions;

export { getEpisodeListThunk };

export default episodeSlice.reducer;