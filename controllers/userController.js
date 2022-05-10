const User = require('../models/user')
const JWR_Secret = "secret_key";
const jwt = require('jsonwebtoken')

exports.registerUser = function (req, res) {

    if (!req.body) return res.sendStatus(400);
    User.findOne({ email: req.body.userEmail }, function (err, u) {
        if (err) return console.log(err);
        if (!u) {
            const userName = req.body.userName;
            const userEmail = req.body.userEmail;
            const userPassword = req.body.userPassword;
            const user = new User({ userName: userName, email: userEmail, password: userPassword });
            console.log(user)
            user.save(function (err) {
                console.log("New User")
                if (err) return console.log(err);
                res.send(user);
            });

        }
        else {
            res.status(403).send({
                errorMessage: "User already exists!!"
            })
        }
    })

};

exports.loginUser = function (req, res) {
    if (req.body) {
        User.findOne({ email: req.body.userEmail }, function (err, user) {
            if (err) return console.log(err);
            if (user) {
                let token = jwt.sign(user.password, JWR_Secret)
                res.status(200).send({
                    signed_user: user,
                    token: token
                })
            }
            else {
                res.status(403).send({
                    errorMessage: 'Wrong email and password!!!'
                })
            }
        })
    }
    else {
        res.status(403).send({
            errorMessage: 'Please enter email and password'
        })
    }
}