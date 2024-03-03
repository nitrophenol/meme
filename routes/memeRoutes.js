// routes/memeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Meme = require('../models/Meme');
const path = require('path');
// Set up multer storage for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST route for uploading memes
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { memeOwner, caption } = req.body;
        const file = req.file.filename;
        const meme = new Meme({ memeOwner, caption, file });
        await meme.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET route for viewing memes
router.get('/', async (req, res) => {
    try {
        const memes = await Meme.find();
        console.log(memes);
        res.render('index', { memes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// GET route for retrieving image src
router.get('/uploads/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        res.sendFile(path.join(__dirname, '../uploads/', filename));
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
