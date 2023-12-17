const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const users = require('../models/users');

// const deleteData = async () => {
//     try {
//         await users.deleteMany({});
//     } catch (err) {
//         console.error(err);
//     }
// };

// deleteData();

router.get('/', async (req, res, next) => {
    try {
        const docs = await users.find();
        res.json({
            count: docs.length,
            users: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.get('/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const docs = await users.findById(userID);
        res.json({
            user: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

cloudinary.config({
    cloud_name: 'dlhjhg5yh', 
    api_key: '887992126494528', 
    api_secret: 'Jc9ZOx2UIVJEtfnb36w5hcGlb2I' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary
});

const uploads = multer({ storage: storage });

router.post('/', uploads.single('profilePhoto'), async (req, res, next) => {
    const userData = ({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        profilePhoto: req.file.path,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location
    });

    try {
        const docs = await users.create(userData);
        res.json({
            Status: 'success',
            user: docs
        })
    } catch (err) {
        res.json({
            Status: 'failure',
            Error: err.message
        })
    }
});

router.post('/compare', async (req, res, next) => {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    try {
        const user = await users.findOne({ email: enteredEmail });

        if (user && await user.comparePassword(enteredPassword)) {
            res.json({
                status: 'Success',
                User: user
            });
        } else {
            res.json({
                status: 'Failure',
                message: 'Access Failed! please check your log-in credentials again.'
            });
        }
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.patch('/:id', uploads.single('profilePhoto'), async (req, res, next) => {
    const userID = req.params.id;
    const update = req.body;

    update.profilePhoto = req.file.path;

    try {
        const docs = await users.findByIdAndUpdate(userID, { $set: update }, { new: true });
        res.json({
            Success: 'user has been updated!',
            update: docs
        });
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        console.error(err);
    }
};

router.patch('/updatePassword/:id', async (req, res, next) => {
    const userID = req.params.id;
    const update = req.body;

    try {
        update.password = await hashPassword(update.password);
        const docs = await users.findByIdAndUpdate(userID, {$set: update}, {new: true});
        res.json({
            status: 'Success!',
            update: docs
        });
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.delete('/:id', async (req, res, next) => {
    const userToDelete = req.params.id;
    try {
        const docs = await users.findByIdAndDelete(userToDelete);
        res.json({
            Success: 'user deleted!',
            userDeleted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;