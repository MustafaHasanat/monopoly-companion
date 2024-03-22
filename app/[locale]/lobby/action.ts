"use server";

import { createClient } from "@/utils/supabase/server";

export async function createNewGame({
    template,
    banker_id,
}: {
    template: string;
    banker_id: string;
}) {
    const supabase = createClient();

    const codeResponse = await supabase.rpc("generate_unique_game_code");

    const response = await supabase
        .from("game")
        .insert({
            code: codeResponse.data,
            template,
            banker_id,
        })
        .select();

    return { response, codeResponse };
}

export async function getGameByCode({ code }: { code: string }) {
    const supabase = createClient();

    const response = await supabase.from("game").select().eq("code", code);

    return response;
}
