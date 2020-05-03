import {expect} from "chai";
import "mocha";
import {User} from "../src/controllers/v0/users/models/User";
import {sequelize} from "../src/sequelize";
import {V0MODELS} from "../src/controllers/v0/model.index";
import {generateJWT} from "../src/lib/auth";
import * as jwt from "jsonwebtoken";

describe("user", () => {
    it('should test', async () => {
        await sequelize.addModels(V0MODELS);
        await sequelize.sync();
        const newUser = await new User({
            email: "test",
            password_hash: "password_hash"
        });
        expect(JSON.stringify(newUser.short())).to.equal(JSON.stringify({ email: 'test' }));
        let token  = generateJWT(newUser)
        let decodedToken = jwt.decode(token, { json: true });
        expect(decodedToken.email).to.equal('test');
    });
});
