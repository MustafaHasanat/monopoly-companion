"use server";

import { createClient } from "@/utils/supabase/server";
import { GameType, TransactionType } from "@/utils/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type PartialTransaction = Omit<
    TransactionType,
    "id" | "is_request" | "created_at" | "status" | "game_id"
>;

type PartialGame = Omit<GameType, "created_at" | "template">;

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

export async function sendCredit({
    game: { banker_id, id: game_id, code },
    transaction: { amount, reason, recipient_id, sender_id },
}: {
    game: PartialGame;
    transaction: PartialTransaction;
}) {
    const supabase = createClient();

    const transactionResponse = await supabase
        .from("transaction")
        .insert({
            reason,
            amount,
            is_request: false,
            game_id,
            recipient_id,
            sender_id,
        })
        .select();

    return { transactionResponse };
}

export async function requestCredit({}: {}) {
    const supabase = createClient();

    const response: PostgrestSingleResponse<GameType[]> = await supabase
        .from("transaction")
        .insert({})
        .select();

    return response;
}
