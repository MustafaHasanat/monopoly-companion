/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ControlsProvider } from "./controls-context";
// import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            {/* <SessionProvider> */}
                <ControlsProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ControlsProvider>
            {/* </SessionProvider> */}
        </AppRouterCacheProvider>
    );
}
