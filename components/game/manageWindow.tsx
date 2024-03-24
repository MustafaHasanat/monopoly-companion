"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const ManageWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();

    return isAccessible ? loadingComponent : <>ManageWindow</>;
};

export default ManageWindow;
