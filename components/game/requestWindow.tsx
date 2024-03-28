"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const RequestWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });

    return isAccessible ? loadingComponent : <>RequestWindow</>;
};

export default RequestWindow;
