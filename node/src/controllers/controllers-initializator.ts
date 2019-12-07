import cookieParser from "cookie-parser";
import cors from "cors";
import core from "express";
import { AdminAuthController } from "./admin-auth-controller";
import { ICoolController } from "./cool-controller";
import { PostsController } from "./posts-controller";

export class ControllersInitializator {
    private app: core.Express;
    private controllersTape: ICoolController[] = [
        new AdminAuthController(),
        new PostsController()
    ];

    constructor(app: core.Express) {
        this.app = app;
        this.setServerSettings();
    }

    public initControllers(): void {
        this.controllersTape.forEach((controller) => {
            controller.init(this.app);
        });
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
