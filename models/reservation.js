const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema ({
    reservistID: {
        type: String,
        required: true
    },
    hostID: {
        type: String,
        required: true
    },
    reservistPhoto: {
        type: String,
        required: true
    },
    reservistName: {
        type: String,
        required: true
    },
    offerTitle: {
        type: String,
        required: true
    },
    offerLocation: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    new: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;