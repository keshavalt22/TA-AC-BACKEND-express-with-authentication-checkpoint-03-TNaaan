var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/users')

var incomeSchema = new Schema({
    incname: {type: String,},
    sources: {type: [String]},
    amount: {type: Number},
    date: {type: Date},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Income', incomeSchema);