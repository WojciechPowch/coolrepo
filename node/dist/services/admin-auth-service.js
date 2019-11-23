"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blowfish_engine_1 = require("../crypto/blowfish-engine");
const token_manager_1 = require("../crypto/token-manager");
const database_adapter_1 = require("../database/database-adapter");
const database_variables_1 = require("../database/database-variables");
class AdminAuthService {
    constructor() {
        this.userCredentialsWrongErrorMessage = "Login or password are wrong";
        this.tokenManager = new token_manager_1.TokenManager();
        this.dbAdapter = database_adapter_1.DatabaseAdapter.getInstance();
    }
    static getInstance() {
        return this.instance;
    }
    authenticateUser(result, password, response) {
        try {
            // @ts-ignore
            const user = this.getUserFromDbResponse(result);
            this.verifyUserPassword(password, user.password);
            const accessToken = this.tokenManager.getAccessToken(user.login);
            const refreshToken = this.tokenManager.getRefreshToken(user.login);
            this.dbAdapter.getDB().collection(database_variables_1.DatabaseVariables.collections.ADMIN_USERS)
                .updateOne({ _id: user._id }, { $set: { refreshToken } });
            response.cookie("isi_7", refreshToken, {
                httpOnly: true
            });
            response.send({
                isi: accessToken,
                success: true,
                userName: user.login
            });
        }
        catch (exception) {
            throw exception;
        }
    }
    getUserFromDbResponse(result) {
        const user = result[0];
        if (!user) {
            throw { message: this.userCredentialsWrongErrorMessage };
        }
        return user;
    }
    verifyUserPassword(fromBrowser, original) {
        const crypto = new blowfish_engine_1.BlowfishEngine();
        const decoded = crypto.decryptAdminPassword(original);
        if (!(decoded === fromBrowser)) {
            throw { message: this.userCredentialsWrongErrorMessage };
        }
    }
}
exports.AdminAuthService = AdminAuthService;
AdminAuthService.instance = new AdminAuthService();
//# sourceMappingURL=admin-auth-service.js.map