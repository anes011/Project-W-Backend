const express = require('express');
const router = express.Router();
const comments = require('../models/comments');

// const deleteAll = async () => {
//     try {
//         await comments.deleteMany({});
//     } catch (err) {
//         console.error(err);
//     }
// };

// deleteAll();

router.post('/', async (req, res, next) => {
    const commentToPost = ({
        commentWriterName: req.body.commentWriterName,
        commentWriterPhoto: req.body.commentWriterPhoto,
        commentReceiverID: req.body.commentReceiverID,
        comment: req.body.comment
    });

    try {
        const docs = await comments.create(commentToPost);
        res.json({
            Status: 'Success!',
            commentPosted: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

router.get('/', async (req, res, next) => {
    try {
        const docs = await comments.find();
        res.json({
            count: docs.length,
            comments: docs
        })
    } catch (err) {
        res.json({
            Error: err.message
        })
    }
});

module.exports = router;