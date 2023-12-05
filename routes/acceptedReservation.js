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

router.patch('/:id', async (req, res, next) => {
    const acceptedReservationID = req.params.id;
    const update = req.body;

    update.new = req.body.new;

    try {
        const docs = await acceptedReservation.findByIdAndUpdate(acceptedReservationID, { $set: update }, { new: true });
        res.json({
            Success: 'updated successfully!',
            update: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const acceptedReservationID = req.params.id;

    try {
        const docs = await acceptedReservation.findByIdAndDelete(acceptedReservationID);
        res.json({
            Success: 'deleted successfully!',
            deleted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;