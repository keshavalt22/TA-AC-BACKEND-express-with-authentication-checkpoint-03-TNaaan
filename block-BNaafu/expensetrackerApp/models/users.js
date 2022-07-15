var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String},
    age: {type: Number},
    phone: {type: Number},
    country: {type: String}
}, {timestamps: true});

userSchema.pre('save', function(next) {
    if(this.password && this .isModified('password')) {
        bcrypt.hash(this.password, 12, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            return next();
        });
    } else{ next()}
});

userSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

module.exports = mongoose.model('User', userSchema);