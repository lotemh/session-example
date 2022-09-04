const express = require("express")
var session = require('express-session');
const path = require("path")
const login = require("./login-utils") 
const adminApi = require("./adminApi.js")

const app = express()
const port = 4000

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))
app.use(express.json())

// the session package
app.use(session({ 
    secret: "elevation", 
    resave: false, 
    saveUninitialized: false 
}))

// custom middleware
app.use('/admin', (req, res, next) => {
    if (login.isAdminLoggedIn(req.session)) {
        next();
    }
    else {
        res.send('You do not have admin permissions');
    }
})
app.use('/admin', adminApi)

app.post('/login', (req, res) => {
    let session = req.session;
    if (login.isVerified(req.body.username, req.body.password)) {
        login.storeUserInSession(session, req.body.username)
        if (login.isAdminLoggedIn(session)){
            res.sendFile(path.join(__dirname, 'dist/admin1.html'));
        } else {
            res.sendFile(path.join(__dirname, 'dist/user1.html'));
        }
    }
    else {
        res.send('Invalid username or password');
    }
})

app.get('/user/page1', (req, res) => {
    let session = req.session
    if (login.isLoggedIn(session)) {
        res.sendFile(path.join(__dirname, 'dist/user1.html'));
    }
    else {
        res.send('You are not logged-in');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send("logged out")
})

app.listen(port, function () {
    console.log("listening on port " + port)
})