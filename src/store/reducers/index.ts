import { setLoading } from './loadingReducer';
import { getEpisodeListThunk, seacrhEpisodeList } from './episodeReducer';
import { getEpisodeDetailThunk, getCharacterDetailsThunk, toggleFavoriteCharacter } from './episodeDetailReducer';
import { addFavoriteCharacterThunk, removeFavoriteCharacterThunk, setfavoriteCharacterList } from './favoriteCharacterReducer';

export { setLoading, getEpisodeListThunk, seacrhEpisodeList, getEpisodeDetailThunk, getCharacterDetailsThunk, toggleFavoriteCharacter, addFavoriteCharacterThunk, removeFavoriteCharacterThunk, setfavoriteCharacterList };
