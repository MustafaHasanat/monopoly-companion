import { type NextRequest } from "next/server";

// get all posts
export async function GET() {
    try {
        const response = {};
        return Response.json(response);
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}

// create a new post
export async function POST(request: NextRequest) {
    try {
        const response = {};
        return Response.json({
            response,
        });
    } catch (error) {
        return Response.json({ message: `Server error: ${error}` });
    }
}
