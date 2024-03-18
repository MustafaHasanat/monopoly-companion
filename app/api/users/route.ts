import { supabase } from "@/libs/configs/supabase";
import { type NextRequest } from "next/server";

// get all users
export async function GET() {
    try {
        const { data } = await supabase.from("user").select("*");
        return Response.json({ data });
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}

// create a new user
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const { error, data } = await supabase.from("user").insert({
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            avatar: formData.get("avatar") || null,
            credit: 0,
            status: formData.get("status"),
        });
        return Response.json({
            message: error
                ? error?.message
                : `User '${data}' has been created!`,
        });
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}
