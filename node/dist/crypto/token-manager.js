"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class TokenManager {
    getAccessToken(login) {
        return jsonwebtoken_1.sign({ login }, process.env.SIGN_ACCESS_STRING, {
            expiresIn: "15m"
        });
    }
    getRefreshToken(login) {
        return jsonwebtoken_1.sign({ login }, process.env.SIGN_REFRESH_STRING, {
            expiresIn: "7d"
        });
    }
    verifyAccessToken(authQuery) {
        const token = authQuery.split(" ")[1];
        if (!token) {
            throw { message: "Your session expired!" };
        }
        const payload = jsonwebtoken_1.verify(token, process.env.SIGN_ACCESS_STRING);
        return payload.login;
    }
}
exports.TokenManager = TokenManager;
//# sourceMappingURL=token-manager.js.map