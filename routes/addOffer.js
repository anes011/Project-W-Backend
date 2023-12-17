const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const addOffer = require('../models/addOffer');

// const deleteAll = async () => {
//     try {
//         const docs = await addOffer.deleteMany({});
//     } catch (err) {
//         console.error(err);
//     }
// };

// deleteAll();

cloudinary.config({ 
    cloud_name: 'dlhjhg5yh', 
    api_key: '887992126494528', 
    api_secret: 'Jc9ZOx2UIVJEtfnb36w5hcGlb2I' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary
});

const uploads = multer({ storage: storage });

router.post('/', uploads.array('offerImages'), async (req, res, next) => {
    const files = req.files;
    const offerImages = files.map(x => x.path);
    
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

router.get('/search', async (req, res, next) => {
    const q = req.query.q;

    try {
        const docs = await addOffer.find({ title: 
            { $regex: new RegExp(q, 'i') } 
        });
        res.json({
            result: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;