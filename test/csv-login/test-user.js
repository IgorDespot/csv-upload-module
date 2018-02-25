//import { pseudoRandomBytes } from 'crypto';

 let checkUser = require('../../lib/login-module').checkUser;
 let auth = require('../../lib/login-module').authenticate;
 let authTest = require('../../lib/login-module').authTest;
// let frisby = require('frisby');
// let request = require('request');
 let app = ('../../app');

// describe('User', function () {

//     it('should fail on POST', function (done) {
//         var options=new Object( );
//         options.username="zamudio";
//         options.password="1234";
//         request.post('http://localhost:3000/users/login', options, function (error, response, body) {
//             //expect(response.statusCode).toEqual(200);
//             console.log("Options  " + options);
//             console.log("Response1  " + response);
//             console.log("Error1  " + error);
//             expect(response).toContain("users/login");
//             done();
//         });
//     });

    // it('should return a status of 200', function (done) {
    //     frisby.get('http://localhost:3000/users/login')
    //     .then(function(res){
    //         expect('status', 200);
    //     })
    //     .done(done);
    //     });

    // it('should fail because of the wrong username', function (done) {
    //     frisby
    //     .post('http://localhost:3000/users/login', 
    //     {username: 'username', password:"123"})
    //     //.expect('status', 200)
    //     //.expect('bodyContains','Unknown User')
    //     .then(function(res){
    //         expect('bodyContains','http://localhost:3000/users/login');
    //     })
    //     //.expect('header','Location', '/users/login')
    //     //.expect('body','Unknown User')
    //     .done(done);
    // })

    // it('should fail because of the wrong password', function (done) {
    //     frisby
    //     .post('http://localhost:3000/users/login', 
    //     {username: 'zamudio', password:"1234"})
    //     .then(function(res){
    //         expect('status', 200);
    //         expect('bodyContains','http://localhost:3000/users/login');
    //     })
    //     //.expect('header','Location', '/users/login')
    //     .done(done);
    // })

    // it('should pass', function (done) {
    //     frisby
    //     .post('http://localhost:3000/users/login', 
    //     {username: 'zamudio', password:'123'})
    //     .then(function(res){
    //         //console.log(res);
    //         expect('status', 200);
    //         expect('bodyContains','http://localhost:3000/upload');
    //     });
    // })
    // it('should be a function', function () {
    //     expect(typeof login.authenticate).toBe('function');
    // });


  //})

// var user;
// var mongoose = require("mongoose");
// var User = require("../../lib/login-module/models/user.js");
// // var User = mongoose.model("User", userSchema);

// var request = require("supertest");
// var server = request.agent("http://localhost:3000");

// describe('User', function () {
//   describe('Login test', function () {
//       it('should redirect to /', function (done) {
//         server
//         .post('/users/login')
//         .field('username', 'zamudio')
//         .field('password', '1234')
//         .expect('referer','http://localhost:3000/users/login')
//         .end(done)
//       })
//   });
// })

describe('User checking', function () {
    it('should pass the test', function () {
           expect(checkUser).toEqual(jasmine.any(Function));
    });

    it ("should't pass the test",function(){
    checkUser("username","password",function(){
        expect('message').toEqual('Something');
    })
    })
    it('should pass the test', function () {
        expect(auth).toEqual(jasmine.any(Function));
    });

    it('should pass the test', function () {
        expect(authTest).toEqual(jasmine.any(Function));
    });
})