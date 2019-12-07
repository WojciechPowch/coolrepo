import core from "express";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";
import { AdminAuthService } from "../services/admin-auth-service";
import { ICoolController } from "./cool-controller";

export class AdminAuthController implements ICoolController {

    private app: core.Express;
    private service: AdminAuthService;

    constructor() {
        this.service = AdminAuthService.getInstance();
    }

    public init(app: core.Express): void {
        this.app = app;
        this.app.get("/adminLogin", this.adminLogin);
        this.app.post("/adminLogout", this.adminLogout);
    }

    private adminLogin = async (request: core.Request, response: core.Response) => {
        await this.service.provideAuthenticateAction(request, response);
    }

    private adminLogout = (request: core.Request, response: core.Response) => {
        response.clearCookie("isi_7");
        response.send({
            success: true
        });
    }
}
