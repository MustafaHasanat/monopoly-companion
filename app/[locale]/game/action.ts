"use server";

import { createClient } from "@/utils/supabase/server";
import { GameType } from "@/utils/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getGameByCode({
    code,
}: {
    code: string;
}): Promise<PostgrestSingleResponse<GameType[]>> {
    const supabase = createClient();

    const response = await supabase.from("game").select().eq("code", code);

    return response;
}

export async function endTheGame({ code }: { code: string }) {
    const supabase = createClient();

    const response = await supabase.from("game").delete().eq("code", code);

    return response;
}

