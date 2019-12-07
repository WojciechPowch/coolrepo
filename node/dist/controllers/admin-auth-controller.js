"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_auth_service_1 = require("../services/admin-auth-service");
class AdminAuthController {
    constructor() {
        this.adminLogin = async (request, response) => {
            await this.service.provideAuthenticateAction(request, response);
        };
        this.adminLogout = (request, response) => {
            response.clearCookie("isi_7");
            response.send({
                success: true
            });
        };
        this.service = admin_auth_service_1.AdminAuthService.getInstance();
    }
    init(app) {
        this.app = app;
        this.app.get("/adminLogin", this.adminLogin);
        this.app.post("/adminLogout", this.adminLogout);
    }
}
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth-controller.js.map