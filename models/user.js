/**
 * Created by zhoubinjia on 15/5/10.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.virtual('uid').get(function () {
    return this.id;
});

module.exports = mongoose.model('User', UserSchema);