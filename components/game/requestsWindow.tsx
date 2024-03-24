"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const RequestsWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();

    return isAccessible ? loadingComponent : <>RequestsWindow</>;
};

export default RequestsWindow;
