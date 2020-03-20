const supertest = require('supertest');

const app = require('../../src/app');


describe('Authentication', () => {
    
    it('Should return a status 200 for a created user', async () => {
        response = await supertest(app)
            .post('/users')
            .send({
                // username: 'raiden.wolfy',
                // email: 'raiden.wolfy@provider.com',
                // password: '1234abcd'
            });

        expect(response.status).toBe(201);
    });
});
