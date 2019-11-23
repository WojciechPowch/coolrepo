"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_adapter_1 = require("../database/database-adapter");
const database_variables_1 = require("../database/database-variables");
const admin_auth_service_1 = require("../services/admin-auth-service");
class AdminAuthController {
    constructor(app) {
        this.adminLogin = (request, response) => {
            const login = request.query.login;
            const password = request.query.password;
            database_adapter_1.DatabaseAdapter
                .getInstance()
                .getDB()
                .collection(database_variables_1.DatabaseVariables.collections.ADMIN_USERS).find({ login })
                // @ts-ignore
                .toArray((err, res) => {
                if (err) {
                    response.send({ sucess: false, message: "Failed to login" });
                    return;
                }
                try {
                    this.service.authenticateUser(res, password, response);
                }
                catch (exception) {
                    response.send({ sucess: false, message: "Failed to login" });
                }
            });
        };
        this.adminLogout = (request, response) => {
            response.clearCookie("isi_7");
            response.send({
                success: true
            });
        };
        this.app = app;
        this.service = admin_auth_service_1.AdminAuthService.getInstance();
    }
    init() {
        this.app.get("/adminLogin", this.adminLogin);
        this.app.post("/adminLogout", this.adminLogout);
    }
}
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth-controller.js.map