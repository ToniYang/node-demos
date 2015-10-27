var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zufang');
var house = mongoose.model('house', {
    address: String,
    money : String,
    url : String
});

module.exports = house;