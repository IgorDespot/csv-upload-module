let login = require('lib/login-module');
let frisby = require('frisby');
let app = ('../../app');

describe('User', function () {
    it('should return a status of 200', function (done) {
        frisby.get('http://localhost:3000/users/login')
        .then(function(res){
            expect('status', 200);
        })
        .done(done);
        });

    it('should fail because of the wrong username', function (done) {
        frisby
        .post('http://localhost:3000/users/login', 
        {username: 'username', password:"123"})
        //.expect('status', 200)
        //.expect('bodyContains','Unknown User')
        .then(function(res){
            expect('bodyContains','http://localhost:3000/users/login');
        })
        //.expect('header','Location', '/users/login')
        //.expect('body','Unknown User')
        .done(done);
    })

    it('should fail because of the wrong password', function (done) {
        frisby
        .post('http://localhost:3000/users/login', 
        {username: 'zamudio', password:"1234"})
        .then(function(res){
            expect('status', 200);
            expect('bodyContains','http://localhost:3000/users/login');
        })
        //.expect('header','Location', '/users/login')
        .done(done);
    })

    it('should pass', function (done) {
        frisby
        .post('http://localhost:3000/users/login', 
        {username: 'zamudio', password:'123'})
        .then(function(res){
            console.log(res);
            expect('status', 200);
            expect('bodyContains','http://localhost:3000/upload');
        });
    })
    it('should be a function', function () {
        expect(typeof login.authenticate).toBe('function');
    });


  })