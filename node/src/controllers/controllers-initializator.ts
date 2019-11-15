import core from "express";
import { AdminAuthController } from "./admin-auth-controller";

export class ControllersInitializator {
    private app: core.Express;

    constructor(app: core.Express) {
        this.app = app;
    }

    public initControllers(): void {
        const adminAuthController = new AdminAuthController(this.app);
        adminAuthController.init();
    }
}
