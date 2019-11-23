"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class BlowfishEngine {
    constructor() {
        this.sign = process.env.ADMIN_USER_BLF;
        this.iv = process.env.IV;
        this.algorithmName = "bf-cbc";
    }
    encryptAdminPassword(password) {
        return this.encrypt(password, this.sign, this.iv);
    }
    decryptAdminPassword(password) {
        return this.decrypt(password, this.sign, this.iv);
    }
    encrypt(password, sign, iv) {
        const inCrypt = crypto_1.default.createCipher(this.algorithmName, sign);
        inCrypt.setAutoPadding(false);
        // @ts-ignore
        let encrypted = inCrypt.update(password, "utf-8", "base64");
        encrypted += inCrypt.final("base64");
        return encrypted;
    }
    decrypt(password, sign, iv) {
        const deCrypt = crypto_1.default.createDecipher(this.algorithmName, sign);
        // @ts-ignore
        let decrypted = deCrypt.update(password, "base64", "utf-8");
        decrypted += deCrypt.final("utf-8");
        return decrypted;
    }
}
exports.BlowfishEngine = BlowfishEngine;
//# sourceMappingURL=blowfish-engine.js.map