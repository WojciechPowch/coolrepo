import cookieParser from "cookie-parser";
import cors from "cors";
import core from "express";
import { AdminAuthController } from "./admin-auth-controller";

export class ControllersInitializator {
    private app: core.Express;

    constructor(app: core.Express) {
        this.app = app;
        this.setServerSettings();
    }

    public initControllers(): void {
        const adminAuthController = new AdminAuthController(this.app);
        adminAuthController.init();
    }

    private setServerSettings(): void {
        this.app.use(core.json());
        this.app.use(cookieParser());
        this.app.use(core.urlencoded( { extended: true}));
        this.app.use(cors({
            credentials: true,
            origin: "http://localhost:4200"
        }));
    }
}
