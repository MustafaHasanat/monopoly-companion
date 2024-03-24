"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { selectGame } from "@/utils/redux/game-slice";
import { useSelector } from "react-redux";

const MainWindow = () => {
    const { isAccessible, loadingComponent } = useAuthGuard();
    const { game } = useSelector(selectGame);

    return isAccessible ? loadingComponent : <>{game.code}</>;
};

export default MainWindow;
