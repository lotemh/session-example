const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser");


const app = express()
const port = 4000

app.use(express.static(path.join(__dirname, "dist")))
app.use(cookieParser());


app.get('/hello', (req, res) => {
    let bgColor = req.cookies.bgColor || "salmon"
    let html = `<body style='background:${bgColor}'>Hello User</body>`
    res.send(html)  
})

// set cookie in the client
// document.cookie = "bgColor=gold";

app.get('/color/:color', (req, res) => {
    let bgColor = req.params.color || "salmon"
    res.cookie('bgColor', bgColor);
    res.redirect(303, '/hello') 
    // 303 See Other - the redirects don't link to the requested resource itself, 
    // but to another page
})

app.listen(port, function () {
    console.log("listening on port " + port)
})