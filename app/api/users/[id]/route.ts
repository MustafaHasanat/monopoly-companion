import { supabase } from "@/libs/configs/supabase";
import { type NextRequest } from "next/server";

// get a post by ID
export async function GET(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        return Response.json(
            docSnap.exists()
                ? {
                      id: docSnap.id,
                      ...docSnap.data(),
                  }
                : { message: "Post doesn't exist" }
        );
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
        const formData = await request.formData();
        const docRef = doc(db, "posts", id);
        await updateDoc(docRef, {
            title: formData.get("title"),
            url: formData.get("url"),
        });
        return Response.json({
            message: `Post '${id}' has been updated!`,
        });
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
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
        return Response.json({ message: "Post has been removed!" });
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}
