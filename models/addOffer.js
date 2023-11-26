const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addOfferSchema = new Schema ({
    hostID: {
        type: String,
        required: true
    },
    placeType: {
        type: String,
        required: true
    },
    spaceGiven: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    wifi: {
        type: Boolean,
        required: true
    },
    tv: {
        type: Boolean,
        required: true
    },
    washer: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    airConditioning: {
        type: Boolean,
        required: true
    },
    pool: {
        type: Boolean,
        required: true
    },
    firstAidKit: {
        type: Boolean,
        required: true
    },
    fireDistinguisher: {
        type: Boolean,
        required: true
    },
    offerImages: [
        {
            type: String,
            required: true
        }
    ],
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    }
});

const addOffer = mongoose.model('addOffer', addOfferSchema);

module.exports = addOffer;