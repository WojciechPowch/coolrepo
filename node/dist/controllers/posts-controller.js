"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_manager_1 = require("../crypto/token-manager");
const database_adapter_1 = require("../database/database-adapter");
const posts_service_1 = require("../services/posts-service");
class PostsController {
    constructor() {
        this.addPost = async (request, response) => {
            await this.service.addPost(request, response);
        };
        this.posts = async (request, response) => {
            await this.service.getPostsList(request, response);
        };
        this.tokenManager = new token_manager_1.TokenManager();
        this.dbAdapter = database_adapter_1.DatabaseAdapter.getInstance();
        this.service = posts_service_1.PostsService.getInstance();
    }
    init(app) {
        this.app = app;
        this.app.get("/addPost", this.addPost);
        this.app.get("/posts", this.posts);
    }
}
exports.PostsController = PostsController;
//# sourceMappingURL=posts-controller.js.map