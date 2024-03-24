import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './reducers/loadingReducer';
import episodeReducer from './reducers/episodeReducer';
import episodeDetailReducer from './reducers/episodeDetailReducer';


const store = configureStore({
    reducer: {
        loadingReducer,
        episodeReducer,
        episodeDetailReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Uyarı eşiğini artırın veya false değeri ile kontrolü tamamen devre dışı bırakın
                warnAfter: 100, // Örneğin, eşiği 100ms'ye çıkarın
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;