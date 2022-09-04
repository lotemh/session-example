// dummy credentials - should be in DB
const users = {
    "lotem": {
        password: "12345",
        isAdmin: true
    },
    "ameer": {
        password: "catsarewonderful111",
        isAdmin: false
    }
}

function isLoggedIn(session){
    return isUserNameExist(session) && users[session.username].sessionId === session.id
}

function isAdmin(session){
    return session && users[session.username].isAdmin
}

function isUserNameExist(session){
    return session && users[session.username] !== undefined
}

function isVerified(username, userPassword){
    return users[username] && users[username].password == userPassword
}

function isAdminLoggedIn(session){
    return isLoggedIn(session) && isAdmin(session)  
}

function storeUserInSession(session, username){
    session.username = username;
    users[username].sessionId = session.id
}

module.exports = { isLoggedIn, isVerified, isAdminLoggedIn, storeUserInSession }