const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acceptedReservationSchema = new Schema ({
    reservistID: {
        type: String,
        required: true
    },
    offerTitle: {
        type: String,
        required: true
    },
    hostPhoto: {
        type: String,
        required: true
    },
    hostName: {
        type: String,
        required: true
    },
    hostEmail: {
        type: String,
        required: true
    },
    hostPhone: {
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

const acceptedReservation = mongoose.model('acceptedReservation', acceptedReservationSchema);

module.exports = acceptedReservation;