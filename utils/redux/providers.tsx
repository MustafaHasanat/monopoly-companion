/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeProvider from "./themeProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from 'react-helmet-async';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <HelmetProvider>
                <Provider store={store}>
                    {/* <PersistGate loading={null} persistor={persistor}> */}
                        <ThemeProvider>{children}</ThemeProvider>
                    {/* </PersistGate> */}
                </Provider>
            </HelmetProvider>
        </AppRouterCacheProvider>
    );
}
