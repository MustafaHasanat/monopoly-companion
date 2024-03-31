"use client";

import useLocale from "./useLocale";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { usePathname, useRouter } from "next/navigation";
import { PRIVATE_PATHS } from "@/utils/constants";
import { ReactNode, useEffect, useState } from "react";
import LoadingPage from "@/components/shared/loading";

interface Props {
    page: "account" | "lobby" | "game" | "auth";
    customCondition?: boolean;
}
interface ReturnProps {
    isAccessible: boolean;
    loadingComponent: ReactNode;
}

const useAuthGuard = ({ page, customCondition = true }: Props): ReturnProps => {
    const { getDictLocales } = useLocale();
    const { global } = getDictLocales();
    const { session } = useSelector(selectAuth);
    const router = useRouter();
    const pathname = usePathname();

    const isSpecialPath = page === "auth";

    const [isAccessible, setIsAccessible] = useState(isSpecialPath);
    const isPrivatePath = PRIVATE_PATHS.includes(page);

    useEffect(() => {
        const isLoggedIn = !!session?.access_token;

        if (isLoggedIn) {
            if (isPrivatePath && customCondition) {
                setIsAccessible(true);
            } else {
                setIsAccessible(false);
                setTimeout(() => {
                    router.replace("/lobby");
                }, 1000);
            }
        } else {
            if (isPrivatePath && customCondition) {
                setIsAccessible(false);
                setTimeout(() => {
                    router.replace("/auth?active=login");
                }, 1000);
            } else {
                setIsAccessible(true);
            }
        }
    }, [
        customCondition,
        isPrivatePath,
        pathname,
        router,
        session?.access_token,
    ]);

    return {
        isAccessible,
        loadingComponent: <LoadingPage phrase={global.redirecting} />,
    };
};

export default useAuthGuard;
