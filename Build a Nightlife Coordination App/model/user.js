var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var UserSchema = mongoose.Schema({
    local: {
        username: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
})

var salt = bcrypt.genSaltSync(saltRounds);
UserSchema.methods.genHash = function (password) {
    return bcrypt.hashSync(password, salt);
}
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
}
var User = module.exports = mongoose.model('user', UserSchema);
