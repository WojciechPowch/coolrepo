"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_manager_1 = require("../crypto/token-manager");
const database_adapter_1 = require("../database/database-adapter");
const database_variables_1 = require("../database/database-variables");
class TokenIdentityService {
    constructor() {
        this.dbAdapter = database_adapter_1.DatabaseAdapter.getInstance();
        this.tokenManager = new token_manager_1.TokenManager();
    }
    static getInstance() {
        if (!this.instanse) {
            this.instanse = new TokenIdentityService();
        }
        return this.instanse;
    }
    async verifyTokens(request, response) {
        try {
            const isi = request.headers.isi;
            const payloadLogin = this.tokenManager.verifyAccessToken(isi);
            const res = await this.dbAdapter.getData(database_variables_1.DatabaseVariables.collections.ADMIN_USERS, { login: payloadLogin });
            if (!res[0]) {
                throw { success: false, message: "Bad authorithy!" };
            }
        }
        catch (exception) {
            if (exception.success === undefined) {
                throw { sucess: false, message: "Session expired!" };
            }
            else {
                throw exception;
            }
        }
    }
}
exports.TokenIdentityService = TokenIdentityService;
//# sourceMappingURL=token-identity-service.js.map