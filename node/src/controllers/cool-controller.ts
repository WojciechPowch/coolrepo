import core from "express";

export interface ICoolController {
    init(app: core.Express): void;
}
