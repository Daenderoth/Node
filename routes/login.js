const express = require('express');
var session = require('express-session');
const router = express.Router();
const MD5 = require('md5');
const con = require('../Models/mysqlCon');


router.get('/', function(req, res, next) {
    /* TO DO
        Create the login form in twig
     */
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    let {username, password} = req.body;
    ssn = req.session;
    /*
        TO DO
        1. Verify the user exists in the database;
        2. Check the password matches (The password must be encrypted)
        3. Save the user in the session.
     */
    let error = '';
    con.checkRecordExists({
        table:"user", args: [{col: "username", value: username},
                             {col: "password", value: MD5(password)}]
    },(result)=>{
        console.log(MD5(password));
        console.log(username);
        console.log("user", result);
        if(!result){
            error= "Wrong username or password"
            res.render('login', { title: 'Login' });
        }else{
            console.log("success");
            ssn.user = req.body.username;
            res.render('index', { title: 'Express' , session: req.session, user:username});
        }
    })
    
});

module.exports = router;
