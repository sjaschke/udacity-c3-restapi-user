import {expect} from "chai";
import "mocha";
import {comparePasswords, generateJWT, generatePassword} from "../src/lib/auth";
import * as jwt from "jsonwebtoken";

describe("jwt", () => {
    it('should generate token', async () => {
        let user = {email: 'test'}
        let token = generateJWT(user)
        let decodedToken = jwt.decode(token, {json: true});
        expect(decodedToken.email).to.equal('test');
    });
});

describe("comparePasswords", () =>{
    it('should return true',  async () => {
        let hash = await generatePassword('test');
        expect(await comparePasswords('test', hash)).to.equal(true);
    });
})
