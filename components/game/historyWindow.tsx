"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const HistoryWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();

    return isAccessible ? loadingComponent : <>HistoryWindow</>;
};

export default HistoryWindow;
