const request = require('supertest')
const app = require('../index')

describe('Get Endpoint', () => {
  it('create a new get request', async () => {
    const res = await request(app).get('/api');      
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    })
})
