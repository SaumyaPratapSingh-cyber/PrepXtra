import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        // Try getting token from cookies (preferred)
        let token = request.cookies.get("auth_token")?.value || "";

        // If no cookie, try Authorization header
        if (!token) {
            const authHeader = request.headers.get("Authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            throw new Error("No token provided");
        }

        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod");
        return decodedToken.userId;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
