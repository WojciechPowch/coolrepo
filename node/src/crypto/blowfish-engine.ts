import crypto from "crypto";

export class BlowfishEngine {
    private sign: string = process.env.ADMIN_USER_BLF;
    private iv: string = process.env.IV;
    private algorithmName: string = "bf-cbc";

    public encryptAdminPassword(password: string): string {
        return this.encrypt(password, this.sign, this.iv);
    }

    public decryptAdminPassword(password: string): string {
        return this.decrypt(password, this.sign, this.iv);
    }

    private encrypt(password: string, sign: string, iv: string): string {
        const inCrypt = crypto.createCipher(this.algorithmName, sign);
        inCrypt.setAutoPadding(false);
        // @ts-ignore
        let encrypted = inCrypt.update(password, "utf-8", "base64");
        encrypted += inCrypt.final("base64");
        return encrypted;
    }

    private decrypt(password: string, sign: string, iv: string): string {
        const deCrypt = crypto.createDecipher(this.algorithmName, sign);
        // @ts-ignore
        let decrypted = deCrypt.update(password, "base64", "utf-8");
        decrypted += deCrypt.final("utf-8");
        return decrypted;
    }
}
