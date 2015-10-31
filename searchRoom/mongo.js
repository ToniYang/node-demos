var mongoose = require('mongoose');
Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/zufang');

var house = mongoose.model('house', new Schema({
    address: String,
    money : String,
    url : String,
    toWork : Number,
    toScl : Number
},{strict: true}));

module.exports = house;