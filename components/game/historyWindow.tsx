"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const HistoryWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });

    return !isAccessible ? loadingComponent : <>HistoryWindow</>;
};

export default HistoryWindow;
