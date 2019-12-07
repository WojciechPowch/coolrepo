"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const admin_auth_controller_1 = require("./admin-auth-controller");
const posts_controller_1 = require("./posts-controller");
class ControllersInitializator {
    constructor(app) {
        this.controllersTape = [
            new admin_auth_controller_1.AdminAuthController(),
            new posts_controller_1.PostsController()
        ];
        this.app = app;
        this.setServerSettings();
    }
    initControllers() {
        this.controllersTape.forEach((controller) => {
            controller.init(this.app);
        });
    }
    setServerSettings() {
        this.app.use(express_1.default.json());
        this.app.use(cookie_parser_1.default());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cors_1.default({
            credentials: true,
            origin: "http://localhost:4200"
        }));
    }
}
exports.ControllersInitializator = ControllersInitializator;
//# sourceMappingURL=controllers-initializator.js.map