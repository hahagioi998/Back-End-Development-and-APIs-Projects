var mongoose = require('mongoose');
var PlaceSchema = mongoose.Schema({
    name: String,
    zip_code: Number,
    reservedList: [String],
    numgoing: {
        type: Number,
        default: 0
    }
});

var Place = module.exports = mongoose.model('place', PlaceSchema); 