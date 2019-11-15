"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_auth_controller_1 = require("./admin-auth-controller");
class ControllersInitializator {
    constructor(app) {
        this.app = app;
    }
    initControllers() {
        const adminAuthController = new admin_auth_controller_1.AdminAuthController(this.app);
        adminAuthController.init();
    }
}
exports.ControllersInitializator = ControllersInitializator;
//# sourceMappingURL=controllers-initializator.js.map