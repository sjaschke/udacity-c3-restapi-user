const app = require('../src/server');

import 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET / - a simple api endpoint", () => {
    it("should get all students record", (done) => {
        var requester = chai.request(app.default).keepOpen()
        requester.get('/')
            .then(response => {
               expect(response).to.have.status(200);
            })
            .then(() => {
                requester.close();
                done();
            })
    });
});
