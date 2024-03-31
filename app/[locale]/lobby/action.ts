"use server";

import { createClient } from "@/utils/supabase/server";
import { GameType } from "@/utils/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function createNewGame({
    template,
    banker_id,
}: {
    template: string;
    banker_id: string;
}) {
    const supabase = createClient();

    const codeResponse: PostgrestSingleResponse<string> = await supabase.rpc(
        "generate_unique_game_code"
    );

    const response: PostgrestSingleResponse<GameType[]> = await supabase
        .from("game")
        .insert({
            code: codeResponse.data,
            template,
            banker_id,
        })
        .select();

    supabase
        .channel(codeResponse.data || "")
        .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
            console.log("Change received!", payload);
        })
        .subscribe();

    return { response, codeResponse };
}

export async function joinGame({ code }: { code: string }) {
    const supabase = createClient();
}
