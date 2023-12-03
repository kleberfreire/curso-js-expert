const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('Api suite test', () => {
  let app
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })
  after((done) => app.close(done))

  describe('/constact:get', () => {
    it('should request the contact route and return Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)

        assert.strictEqual(response.text, 'Contact us page!')
    })
  })

  describe('/login:post', () => {
    it('should request the login and return Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({"username": "KleberFreire","password": "123"})
        .expect(200)
        // .expect('Log in succeeded!')

        assert.strictEqual(response.text, 'Log in succeeded!')
    })
    it('should request the login and return Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({"username": "xuxaTeste","password": "123"})
        .expect(401)
        // .expect('Log in succeeded!')
        assert.ok(response.unauthorized)
        assert.strictEqual(response.text, 'Log in failed!')
    })
  })

  describe('/constact:get', () => {
    it('should request in router with not exists return Status 404', async () => {
      const response = await supertest(app)
        .get('/lerolero')
        .expect(404)

        assert.strictEqual(response.text, 'not found!')
    })
  })

})