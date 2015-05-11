/**
 * Created by zhoubinjia on 15/5/10.
 */

var User = require('../models/user');
var bcrypt = require('bcrypt');

exports.register = function (req, res, next) {
    var _user = req.body.user;
    //console.log(_user);
    User.findOne({username: _user.username}, function (err, mres) {
        if (err) return next(err);
        if (mres) {
            res.json({
                status: "10001",
                msg:    "账号已存在"
            });
        } else {
            if (_user.password === _user.repeatPassword) {
                cryptPassword(_user.password, function (err, hash) {
                    var user = new User({username: _user.username, password: hash});
                    user.save(function (err) {
                        if (err) return next(err);
                        res.json({
                            status: "200",
                            msg:    "注册成功"
                        });
                    });
                });
            } else {
                res.json({
                    status: "10002",
                    msg:    "两次输入的密码不一致"
                });
            }
        }
    });
};

exports.login = function (req, res, next) {
    var _user = req.body.user;
    User.findOne({username: _user.username}, function (err, mres) {
        if (err) return next(err);
        if (mres) {
            //console.log(mres)
            comparePassword(_user.password, mres.password, function (err, isMatch) {
                if (isMatch) {
                    res.json({
                        uid: mres.uid,
                        username: mres.username,
                        created: mres.created
                    });
                } else {
                    res.json({
                        status: "10003",
                        msg:    "密码错误"
                    });
                }
            });
        } else {
            res.json({
                status: "10004",
                msg:    "账号不存在"
            });
        }
    });
};

function cryptPassword(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

function comparePassword(userPassword, password, callback) {
   bcrypt.compare(userPassword, password, function(err, isPasswordMatch) {
      if (err) 
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};