const express = require('express');
const router = express.Router();
const multer = require('multer');
const addOffer = require('../models/addOffer');

const storage = multer.diskStorage({
    destination: 'offerImages',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: storage });

router.post('/', uploads.array('offerImages'), async (req, res, next) => {
    const files = req.files;
    const offerImages = files.map(x => x.filename);
    
    const offer = ({
        hostID: req.body.hostID,
        placeType: req.body.placeType,
        spaceGiven: req.body.spaceGiven,
        location: req.body.location,
        guests: req.body.guests,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        bathrooms: req.body.bathrooms,
        wifi: req.body.wifi,
        tv: req.body.tv,
        washer: req.body.washer,
        parking: req.body.parking,
        airConditioning: req.body.airConditioning,
        pool: req.body.pool,
        firstAidKit: req.body.firstAidKit,
        fireDistinguisher: req.body.fireDistinguisher,
        offerImages,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    });

    try {
        const docs = await addOffer.create(offer);
        res.json({
            Success: 'offer has been added!',
            offer: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.get('/', async (req, res, next) => {
    try {
        const docs = await addOffer.find();
        res.json({
            count: docs.length,
            offers: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const offerID = req.params.id;

    try {
        const docs = await addOffer.findByIdAndDelete(offerID);
        res.json({
            Success: 'offer has been deleted!',
            deletedOffer: docs
        })
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;