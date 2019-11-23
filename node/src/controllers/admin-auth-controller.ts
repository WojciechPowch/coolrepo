import core from "express";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";
import { AdminAuthService } from "../services/admin-auth-service";

export class AdminAuthController {

    private app: core.Express;
    private service: AdminAuthService;

    constructor(app: core.Express) {
        this.app = app;
        this.service = AdminAuthService.getInstance();
    }

    public init(): void {
        this.app.get("/adminLogin", this.adminLogin);
        this.app.post("/adminLogout", this.adminLogout);
    }

    private adminLogin = (request: core.Request, response: core.Response) => {
        const login = request.query.login;
        const password = request.query.password;
        DatabaseAdapter
            .getInstance()
            .getDB()
            .collection(DatabaseVariables.collections.ADMIN_USERS).find({ login })
            // @ts-ignore
            .toArray((err, res) => {
                if (err) {
                    response.send({ sucess: false, message: "Failed to login" });
                    return;
                }
                try {
                    this.service.authenticateUser(res, password, response);
                } catch (exception) {
                    response.send({ sucess: false, message: "Failed to login" });
                }
            });
    }

    private adminLogout = (request: core.Request, response: core.Response) => {
        response.clearCookie("isi_7");
        response.send({
            success: true
        });
    }
}
