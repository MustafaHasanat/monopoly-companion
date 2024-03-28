"use client";

import useAuthGuard from "@/hooks/useAuthGuard";

const BankWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard({ page: "game" });

    return !isAccessible ? loadingComponent : <>BankWindow</>;
};

export default BankWindow;
