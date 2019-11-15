import core from "express";

export class AdminAuthController {

    private app: core.Express;

    constructor(app: core.Express) {
        this.app = app;
    }

    public init(): void {
        this.app.post("/signin", (req, res) => {
            const a = 1;
        });
    }
}
