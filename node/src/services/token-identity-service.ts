import core from "express";
import { TokenManager } from "../crypto/token-manager";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";

export class TokenIdentityService {

    public static getInstance(): TokenIdentityService {
        if (!this.instanse) {
            this.instanse = new TokenIdentityService();
        }
        return this.instanse;
    }
    private static instanse: TokenIdentityService;
    private dbAdapter: DatabaseAdapter;
    private tokenManager: TokenManager;

    private constructor() {
        this.dbAdapter = DatabaseAdapter.getInstance();
        this.tokenManager = new TokenManager();
    }

    public async verifyTokens(request: core.Request, response: core.Response): Promise<any> {
        try {
            const isi: string = request.headers.isi as string;
            const payloadLogin: string = this.tokenManager.verifyAccessToken(isi);
            const res = await this.dbAdapter.getData(DatabaseVariables.collections.ADMIN_USERS,
                { login: payloadLogin });
            if (!res[0]) {
                throw { success : false, message: "Bad authorithy!" };
            }
        } catch (exception) {
            if (exception.success === undefined) {
                throw { sucess: false, message: "Session expired!" };
            } else {
                throw exception;
            }
        }
    }
}
