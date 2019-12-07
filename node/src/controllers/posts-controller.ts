import core from "express";
import { TokenManager } from "../crypto/token-manager";
import { DatabaseAdapter } from "../database/database-adapter";
import { DatabaseVariables } from "../database/database-variables";
import { PostsService } from "../services/posts-service";
import { ICoolController } from "./cool-controller";

export class PostsController implements ICoolController {

    private app: core.Express;
    private tokenManager: TokenManager;
    private dbAdapter: DatabaseAdapter;
    private service: PostsService;

    constructor() {
        this.tokenManager = new TokenManager();
        this.dbAdapter = DatabaseAdapter.getInstance();
        this.service = PostsService.getInstance();
    }

    public init(app: core.Express): void {
        this.app = app;
        this.app.get("/addPost", this.addPost);
        this.app.get("/posts", this.posts);
    }

    private addPost = async (request: core.Request, response: core.Response) => {
        await this.service.addPost(request, response);
    }

    private posts = async (request: core.Request, response: core.Response) => {
        await this.service.getPostsList(request, response);
    }
}
