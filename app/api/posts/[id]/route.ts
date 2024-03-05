import { db } from "@/libs/configs/firebase";
import { type NextRequest } from "next/server";

// get a post by ID
export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const response = {};
        return Response.json(response);
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}

// update a post
export async function PATCH(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const response = {};
        return Response.json(response);
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}

// delete a post
export async function DELETE(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const response = {};
        return Response.json(response);
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}
