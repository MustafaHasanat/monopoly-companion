"use server";

import { createAdminClient, createClient } from "@/utils/supabase/server";
import { UserAvatar, UserStatus } from "@/utils/enums";
import { AdminUserAttributes, UserAttributes } from "@supabase/supabase-js";

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

export async function updateUserById(id: string, attributes: UserAttributes) {
    const supabase = createAdminClient();

    const response = await supabase.auth.admin.updateUserById(id, attributes);

    return response;
}
