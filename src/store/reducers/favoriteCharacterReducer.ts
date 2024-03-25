import { ICharacter } from '@/types/dataTypes';
import { StorageService } from '@/utils/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const addFavoriteCharacterThunk = createAsyncThunk('favorite/addFavoriteCharacter', async (character: ICharacter) => {

    const favoriteData = await StorageService.getItem('favoriteData');
    let favoriteCharacterList: ICharacter[] = [];
    // character isFavourite değeri true yapılıyor
    const characterObj = { ...character, isFavourite: true };

    if (favoriteData) {
        favoriteCharacterList = JSON.parse(favoriteData);
        let index = favoriteCharacterList.findIndex((item: ICharacter) => item.id === characterObj.id);
        if (index === -1) {
            favoriteCharacterList.push(characterObj);
        }
        await StorageService.setItem('favoriteData', JSON.stringify(favoriteCharacterList));
    }
    else {
        favoriteCharacterList.push(characterObj);
        await StorageService.setItem('favoriteData', JSON.stringify(favoriteCharacterList));
    }
    return favoriteCharacterList;

});

const removeFavoriteCharacterThunk = createAsyncThunk('favorite/removeFavoriteCharacter', async (character: ICharacter) => {

    const favoriteData = await StorageService.getItem('favoriteData');
    let favoriteCharacterList: ICharacter[] = [];
    // character isFavourite değeri true yapılıyor
    const characterObj = { ...character, isFavourite: false };

    if (favoriteData) {
        favoriteCharacterList = JSON.parse(favoriteData);
        let index = favoriteCharacterList.findIndex((item: ICharacter) => item.id === characterObj.id);
        if (index !== -1) {
            favoriteCharacterList.splice(index, 1);
        }
        await StorageService.setItem('favoriteData', JSON.stringify(favoriteCharacterList));
    }
    return favoriteCharacterList;

});

const favoriteCharacterSlice = createSlice({
    name: 'episode',
    initialState: {
        status: 'idle',

        favoriteCharacterList: [] as ICharacter[],

    },
    reducers: {
        setfavoriteCharacterList: (state, action) => {
            state.favoriteCharacterList = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addFavoriteCharacterThunk.fulfilled, (state, action) => {
            state.status = 'success';
            state.favoriteCharacterList = action.payload;
        });
        builder.addCase(removeFavoriteCharacterThunk.fulfilled, (state, action) => {
            state.status = 'success';
            state.favoriteCharacterList = action.payload;
        });
    }
});

export const { setfavoriteCharacterList } = favoriteCharacterSlice.actions;

export { addFavoriteCharacterThunk, removeFavoriteCharacterThunk };

export default favoriteCharacterSlice.reducer;