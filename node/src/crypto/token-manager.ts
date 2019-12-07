import { sign, verify } from "jsonwebtoken";

export class TokenManager {

    public getAccessToken(login: string): string {
        return sign( { login }, process.env.SIGN_ACCESS_STRING, {
            expiresIn: "15m"
        });
    }

    public getRefreshToken(login: string): string {
        return sign( { login }, process.env.SIGN_REFRESH_STRING, {
            expiresIn: "7d"
        });
    }

    public verifyAccessToken(authQuery: string): string {
        const token = authQuery;
        if (!token) {
            throw { message: "Your session expired!" };
        }
        const payload = verify(token, process.env.SIGN_ACCESS_STRING) as any;
        return payload.login as string;
    }

}
