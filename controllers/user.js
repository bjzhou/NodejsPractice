/**
 * Created by zhoubinjia on 15/5/10.
 */

var User = require('../models/user');

exports.register = function (req, res, next) {
    var _user = req.body.user;
    User.findOne({username: _user.username}, function (err, mres) {
        if (err) return next(err);
        if (mres) {
            res.json({
                status: "10001",
                msg:    "账号已存在"
            });
        } else {
            if (_user.password === _user.repeatPassword) {
                var user = new User({username: _user.username, password: _user.password});
                user.save(function (err) {
                    if (err) return next(err);
                    res.json({
                        status: "200",
                        msg:    "注册成功"
                    })
                })
            } else {
                res.json({
                    status: "10002",
                    msg:    "两次输入的密码不一致"
                })
            }
        }
    })
};

exports.login = function (req, res, next) {
    var _user = req.body.user;
    User.findOne({username: _user.username}, function (err, mres) {
        if (err) return next(err);
        if (mres) {
            console.log(mres)
            if (_user.password === mres.password) {
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
        } else {
            res.json({
                status: "10004",
                msg:    "账号不存在"
            });
        }
    })
};