import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { persistStore } from "redux-persist";

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };
