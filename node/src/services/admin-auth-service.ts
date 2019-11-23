import { BlowfishEngine } from "../crypto/blowfish-engine";
import { TokenManager } from "../crypto/token-manager";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";

export class AdminAuthService {

    public static getInstance(): AdminAuthService {
        return this.instance;
    }
    private static instance: AdminAuthService = new AdminAuthService();
    private userCredentialsWrongErrorMessage: string = "Login or password are wrong";
    private tokenManager: TokenManager;
    private dbAdapter: DatabaseAdapter;

    private constructor() {
        this.tokenManager = new TokenManager();
        this.dbAdapter = DatabaseAdapter.getInstance();
    }

    public authenticateUser(result: any, password: string, response: any): any {
        try {
            // @ts-ignore
            const user = this.getUserFromDbResponse(result);
            this.verifyUserPassword(password, user.password);
            const accessToken = this.tokenManager.getAccessToken(user.login);
            const refreshToken = this.tokenManager.getRefreshToken(user.login);
            this.dbAdapter.getDB().collection(DatabaseVariables.collections.ADMIN_USERS)
                .updateOne({ _id: user._id},
                            {$set : { refreshToken }});
            response.cookie("isi_7", refreshToken, {
                httpOnly: true
            });
            response.send({
                            isi: accessToken,
                            success: true,
                            userName: user.login });
        } catch (exception) {
            throw exception;
        }
    }

    private getUserFromDbResponse(result: any[]): any {
        const user = result[0];
        if (!user) {
            throw { message: this.userCredentialsWrongErrorMessage };
        }
        return user;
    }

    private verifyUserPassword(fromBrowser: string, original: string): void {
        const crypto = new BlowfishEngine();
        const decoded = crypto.decryptAdminPassword(original);
        if ( !(decoded === fromBrowser) ) {
            throw { message : this.userCredentialsWrongErrorMessage };
        }
    }
}
