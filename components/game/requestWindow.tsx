"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const RequestWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();

    return isAccessible ? loadingComponent : <>RequestWindow</>;
};

export default RequestWindow;
