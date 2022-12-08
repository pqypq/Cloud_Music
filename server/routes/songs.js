const song = require("../models/song")

const router = require("express").Router()

router.get("/getAll", async (req, res) => {
    const options = {
        sort: {createdAt: 1},
    }

    const cursor = await song.find(options)
    if (cursor) {
        res.status(200).send({success: true, data: cursor})
    } else {
        res.status(200).send({success: true, msg: "No Data Found"})
    }
})

router.get("/artist", async (req, res) => {
    const cursor = await song.find({artist: req.query.artist})
    if (cursor) {
        res.status(200).send({success: true, data: cursor})
    } else {
        res.status(200).send({success: true, msg: "No Data Found"})
    }
})

router.get("/album", async (req, res) => {
    const cursor = await song.find({album: req.query.album})
    if (cursor) {
        res.status(200).send({success: true, data: cursor})
    } else {
        res.status(200).send({success: true, msg: "No Data Found"})
    }
})

router.post("/save", async (req, res) => {
    const newSong = new song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    })
    console.log(newSong)
    try {
        const savedSong = await newSong.save()
        res.status(200).send({song: savedSong})
    } catch (error) {
        res.status(400).send({success: false, msg: error})
    }
})

module.exports = router
