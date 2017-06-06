var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    name: String,
    // event_id: String,
    attending_count:Number,
    interested_count:Number,
    start_time: String,
    end_time: String,
    description: String,
    place: String,
    timestamp: Number,
    is_private: Boolean
});

module.exports = mongoose.model('Event', EventSchema);