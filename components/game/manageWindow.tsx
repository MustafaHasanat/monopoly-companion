"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const ManageWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });

    return !isAccessible ? loadingComponent : <>ManageWindow</>;
};

export default ManageWindow;
