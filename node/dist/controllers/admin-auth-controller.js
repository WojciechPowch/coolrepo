"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminAuthController {
    constructor(app) {
        this.app = app;
    }
    init() {
        this.app.post("/signin", (req, res) => {
            const a = 1;
        });
    }
}
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth-controller.js.map