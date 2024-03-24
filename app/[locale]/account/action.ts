"use server";

import { createClient } from "@/utils/supabase/server";

export async function updateProfile({
    email,
    username,
    avatar,
}: {
    email: string;
    username: string;
    avatar: string;
}) {
    const supabase = createClient();

    const response = await supabase.auth.updateUser({
        email,
        data: {
            username,
            avatar,
        },
    });

    return response;
}
