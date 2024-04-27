"use server";

import { createAdminClient, createClient } from "@/utils/supabase/server";
import { PlayerStatus, PlayerAvatar } from "@/utils/enums";
import { UserAttributes } from "@supabase/supabase-js";

export async function login({ email, password }: { email: string; password: string }) {
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
                avatar: PlayerAvatar.M1,
                credit: 0,
                game_id: null,
                status: PlayerStatus.GHOST,
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

export async function updateUser(attributes: UserAttributes) {
    const supabase = createClient();

    const response = await supabase.auth.updateUser(attributes);

    return response;
}

export async function getUserById({ id }: { id: string }) {
    const supabase = createAdminClient();

    const response = await supabase.auth.admin.getUserById(id);

    return response;
}

export async function updateUserById({
    id,
    attributes,
}: {
    id: string;
    attributes: { [key: string]: string | number | null };
}) {
    const supabase = createAdminClient();

    const response = await supabase.auth.admin.updateUserById(id, {
        user_metadata: attributes,
    });

    return response;
}

export async function getUserAndSessionData() {
    const supabase = createClient();
    const remotePlayerResponse = await supabase.auth.getUser();
    const sessionResponse = await supabase.auth.getSession();

    return {
        remotePlayer: remotePlayerResponse.data.user,
        session: sessionResponse.data.session,
    };
}
