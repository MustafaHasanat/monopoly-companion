"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function reset({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        redirect("/error");
    }
}
