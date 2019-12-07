import core from "express";
import { TokenManager } from "../crypto/token-manager";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";
import { TokenIdentityService } from "./token-identity-service";

export class PostsService {

    public static getInstance(): PostsService {
        if (!this.instance) {
            this.instance = new PostsService();
        }
        return this.instance;
    }
    private static instance: PostsService;
    private dbAdapter: DatabaseAdapter;
    private tokenManager: TokenManager;
    private tokenIdentityService: TokenIdentityService;

    private constructor() {
        this.dbAdapter = DatabaseAdapter.getInstance();
        this.tokenManager = new TokenManager();
        this.tokenIdentityService = TokenIdentityService.getInstance();
    }

    public async addPost(request: core.Request, response: core.Response): Promise<any> {
        try {
            await this.tokenIdentityService.verifyTokens(request, response);
        } catch (exception) {
            response.send(exception);
            return;
        }
        try {
            const postTitle: string = request.query.title;
            const postBody: string = request.query.body;
            const success: boolean = await this.dbAdapter.insert(DatabaseVariables.collections.POSTS, {
                content: postBody,
                title: postTitle
            });
            if (success) {
                response.send({ success: true });
                return;
            } else {
                throw new Error();
            }
        } catch (exception) {
            response.send({ success: false, message: "Error ocured while adding a new post!"});
        }
    }

    public async getPostsList(request: core.Request, response: core.Response): Promise<any> {
        try {
            await this.tokenIdentityService.verifyTokens(request, response);
        } catch (exception) {
            response.send(exception);
            return;
        }
        try {
            const posts = await this.dbAdapter.getData(DatabaseVariables.collections.POSTS, {});
            response.send( { posts, success: true } );
            return;
        } catch (exception) {
            response.send( { success: false, message: "Error occured while getting a posts list!" } );
        }
    }
}
