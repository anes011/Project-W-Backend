const express = require('express');
const router = express.Router();
const reservation = require('../models/reservation');

router.post('/', async (req, res, next) => {
    const reservationToPost = ({
        reservistID: req.body.reservistID,
        hostID: req.body.hostID,
        reservistPhoto: req.body.reservistPhoto,
        reservistName: req.body.reservistName,
        offerTitle: req.body.offerTitle,
        offerLocation: req.body.offerLocation,
        Status: req.body.Status
    });

    try {
        const docs = await reservation.create(reservationToPost);
        res.json({
            Success: 'reservation has been placed!',
            reservation: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.get('/', async (req, res, next) => {
    try {
        const docs = await reservation.find();
        res.json({
            count: docs.length,
            reservations: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const reservationID = req.params.id;

    try {
        const docs = await reservation.findByIdAndDelete(reservationID);
        res.json({
            Success: 'reservation has been deleted!',
            deletedReservation: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.patch('/:id', async (req, res, next) => {
    const reservationID = req.params.id;
    const update = req.body;

    update.new = req.body.new;

    try {
        const docs = await reservation.findByIdAndUpdate(reservationID, { $set: update }, { new: true });
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

module.exports = router;