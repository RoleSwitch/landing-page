var superagent = require('superagent'),
    expect = require('chai').expect,
    url = "http://localhost:8080",
    email = "test@test.com"


describe('Database API', function() {

    it('Should register a user email on database', function(done) {
        superagent.post(url + '/join')
            .send({
                'email': email
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res.status).to.eql(200)
                expect(res.body).to.be.ok
                expect(res.body.ok).to.be.equal(true)
                done()
            })
    })

    it('Should give an error message of duplicate email', function(done) {
        superagent.post(url + '/join')
            .send({
                'email': email
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                expect(err).to.be.null
                expect(res.status).to.eql(500)
                expect(res.body).to.be.ok
                expect(res.body.ok).to.be.equal(false)
                done()
            })
    })

})