import {expect} from "chai";
import "mocha";
import {generateJWT} from "../src/lib/auth";
import * as jwt from "jsonwebtoken";

describe("user", () => {
    it('should test', async () => {
        let user = {email: 'test'}
        let token = generateJWT(user)
        let decodedToken = jwt.decode(token, {json: true});
        expect(decodedToken.email).to.equal('test');
    });
});
