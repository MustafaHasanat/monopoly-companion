/* eslint-disable react-hooks/exhaustive-deps */

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ControlsProvider } from "./controls-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <ControlsProvider>{children}</ControlsProvider>
        </AppRouterCacheProvider>
    );
}
