const User = require('../models/user');
const bcrypt = require('bcryptjs');


exports.getLS = (req,res,next) => {
    if(req.session.email){
        return res.redirect('/homepage');
    }
    res.render('login');
}

exports.getHomepage = (req,res,next) =>{
    res.render('homepage');
}

exports.postSignup = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({email : email})
    .then(userInfo => {
        if(userInfo){
          res.render('signedup');
        }
        else{
            bcrypt.hash(password,12)
            .then(hashedPw => {
                const user = new User({
                    username : username,
                    email : email,
                    password : hashedPw                    
                });
                user.save()
                .then(result => {
                    console.log('user saved successfully');
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
            });
            }
        })
    .catch(err =>{
        console.log(err);
    });
}

exports.postLogin = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
    .then(user => {
        if(!user){
            res.redirect('/');
        }
        else{
            bcrypt.compare(password, user.password)
            .then(matching => {
                if(matching){
                    req.session.email = email;
                    res.render('homepage');
                }
                else{
                    res.redirect('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err =>{
        console.log(err);
    });
}

exports.getLogout = (req,res,next) =>{
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/');
        }
    });
}