"use server";

import { createClient } from "@/utils/supabase/server";
import { UserAvatar, UserStatus } from "@/utils/enums";

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const supabase = createClient();

    const response = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return response;
}

export async function register({
    email,
    password,
    username,
}: {
    email: string;
    password: string;
    username: string;
}) {
    const supabase = createClient();

    const response = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                avatar: UserAvatar.M1,
                credit: 0,
                game_id: null,
                status: UserStatus.GHOST,
            },
        },
    });

    return response;
}

export async function logout() {
    const supabase = createClient();
    const response = await supabase.auth.signOut();

    return response;
}

export async function changeUserStatus({ status }: { status: UserStatus }) {
    const supabase = createClient();

    const response = await supabase.auth.updateUser({
        data: {
            status,
        },
    });

    return response;
}
