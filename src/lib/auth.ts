import * as bcrypt from "bcrypt";
import {User} from "../controllers/v0/users/models/User";
import * as jwt from "jsonwebtoken";
import * as c from "../config/config";
import {Request, Response} from "express";
import {NextFunction} from "connect";

export async function generatePassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

export async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash);
}

export function generateJWT(user: User): string {

    return jwt.sign(user.short(), c.config.jwt.secret)
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }


    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }

    const token = token_bearer[1];
    return jwt.verify(token, c.config.jwt.secret , (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}
