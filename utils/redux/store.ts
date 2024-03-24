import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
