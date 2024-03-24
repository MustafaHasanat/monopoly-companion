/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
// import { ControlsProvider } from "../context/controls-context";
// import { SessionProvider } from "next-auth/react";
// import { AuthProvider } from "../context/auth-context";
// import { GameProvider } from "../context/game-context";
import ThemeProvider from "./themeProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            {/* <SessionProvider> */}
            {/* <ControlsProvider>
                <GameProvider>
                    <AuthProvider> */}
            <Provider store={store}>
                {/* <PersistGate loading={null} persistor={persistor}> */}
                    <ThemeProvider>{children}</ThemeProvider>
                {/* </PersistGate> */}
            </Provider>
            {/* </AuthProvider>
                </GameProvider>
            </ControlsProvider> */}
            {/* </SessionProvider> */}
        </AppRouterCacheProvider>
    );
}
