"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_manager_1 = require("../crypto/token-manager");
const database_adapter_1 = require("../database/database-adapter");
const database_variables_1 = require("../database/database-variables");
const token_identity_service_1 = require("./token-identity-service");
class PostsService {
    constructor() {
        this.dbAdapter = database_adapter_1.DatabaseAdapter.getInstance();
        this.tokenManager = new token_manager_1.TokenManager();
        this.tokenIdentityService = token_identity_service_1.TokenIdentityService.getInstance();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new PostsService();
        }
        return this.instance;
    }
    async addPost(request, response) {
        try {
            await this.tokenIdentityService.verifyTokens(request, response);
        }
        catch (exception) {
            response.send(exception);
            return;
        }
        try {
            const postTitle = request.query.title;
            const postBody = request.query.body;
            const success = await this.dbAdapter.insert(database_variables_1.DatabaseVariables.collections.POSTS, {
                content: postBody,
                title: postTitle
            });
            if (success) {
                response.send({ success: true });
                return;
            }
            else {
                throw new Error();
            }
        }
        catch (exception) {
            response.send({ success: false, message: "Error ocured while adding a new post!" });
        }
    }
    async getPostsList(request, response) {
        try {
            await this.tokenIdentityService.verifyTokens(request, response);
        }
        catch (exception) {
            response.send(exception);
            return;
        }
        try {
            const posts = await this.dbAdapter.getData(database_variables_1.DatabaseVariables.collections.POSTS, {});
            response.send({ posts, success: true });
            return;
        }
        catch (exception) {
            response.send({ success: false, message: "Error occured while getting a posts list!" });
        }
    }
}
exports.PostsService = PostsService;
//# sourceMappingURL=posts-service.js.map