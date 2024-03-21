"use client";

import Main from "@/components/layout/main";

export default function Lobby() {
    return (
        <Main
            sx={{
                maxHeight: "100vh",
                minHeight: "100vh",
                overflow: "hidden",
                color: "white",
            }}
        >
            {Array(100)
                .fill("lobby page")
                .map((item, index) => (
                    <div key={index}>
                        {index} {item}
                    </div>
                ))}
        </Main>
    );
}
