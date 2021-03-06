const request = require('supertest')
const server = require('../api/server');
const db = require("../database/dbConfig");

describe('Testing to make sure we get jokes', () => {
    user = {username: "test", password: "password"};

    beforeEach(async () => {
        // this function executes and clears out the table before each test
        await db('users').truncate();
      });
    
    describe('Testing status codes', () => {
        it("should return status 200", async () => {
            let token = 12;
            await request(server).post('/api/auth/register').send(user).then(res => {token = res.body.token});
            console.log(token);
            return await request(server).get('/api/jokes').set({authorization: token}).then(res => expect(res.status).toBe(200));
        });

        it("should return status 401", async () => {
            let token = 12;
            return await request(server).get('/api/jokes').set({authorization: token}).then(res => expect(res.status).toBe(401));
        });
    })

});