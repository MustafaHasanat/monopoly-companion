"use client";

import WindowController from "@/components/game/windowController";
import { GamePage } from "@/utils/types";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
    const searchParams = useSearchParams();
    const activePage: GamePage = searchParams.get("active") as GamePage;

    return <WindowController page={activePage || "main"} />;
}
