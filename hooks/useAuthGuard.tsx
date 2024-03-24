"use client";

import useLocale from "./useLocale";
import { useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { usePathname, useRouter } from "next/navigation";
import { PRIVATE_PATHS } from "@/utils/constants";
import { ReactNode, useEffect, useMemo, useState } from "react";
import LoadingPage from "@/components/shared/loading";

interface Props {
    isAccessible: boolean;
    loadingComponent: ReactNode;
}

const useAuthGuard = (): Props => {
    const { getDictLocales } = useLocale();
    const { global } = getDictLocales();
    const { session } = useSelector(selectAuth);
    const router = useRouter();
    const pathname = usePathname();

    const [isAccessible, setIsAccessible] = useState(false);

    useEffect(() => {
        const isPrivatePath =
            PRIVATE_PATHS.filter((path) => pathname.indexOf(path) === -1)
                .length > 0;

        setIsAccessible(isPrivatePath && !session?.access_token);
    }, [pathname, session?.access_token]);

    if (isAccessible) {
        setTimeout(() => {
            router.replace("/auth?active=login");
        }, 2000);
    }

    return {
        isAccessible,
        loadingComponent: <LoadingPage phrase={global.redirecting} />,
    };
};

export default useAuthGuard;
