const express = require('express');
const router = express.Router();
const acceptedReservation = require('../models/acceptedReservation');

router.post('/', async (req, res, next) => {
    const acceptedReservationToPost = ({
        reservistID: req.body.reservistID,
        offerTitle: req.body.offerTitle,
        hostPhoto: req.body.hostPhoto,
        hostName: req.body.hostName,
        hostEmail: req.body.hostEmail,
        hostPhone: req.body.hostPhone
    });

    try {
        const docs = await acceptedReservation.create(acceptedReservationToPost);
        res.json({
            Success: 'reservation has been accepted successfully!',
            reservationAccepted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.get('/', async (req, res, next) => {
    try {
        const docs = await acceptedReservation.find();
        res.json({
            count: docs.length,
            acceptedReservations: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;