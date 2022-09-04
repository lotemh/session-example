const express = require("express")
const path = require("path")
const router = express.Router()

router.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/admin1.html'));
})

router.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/admin2.html'));
})

router.get('/hello',(req, res) => {
    console.log(req.session.username);
    console.log(req.sessionID);
    res.send("hello")
})

module.exports = router