"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const SendWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();

    return isAccessible ? loadingComponent : <>SendWindow</>;
};

export default SendWindow;
