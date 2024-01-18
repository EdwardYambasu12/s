const express = require("express")
const request = require("request")
const functions = require("firebase-functions")
const firebase_admin = require("firebase-admin ")
const cors = require("cors")
const data = require("./data")
const app = express()
app.use(cors())
app.use(data)

firebase_admin.initializeApp(functions.config().firebase)




app.listen(6100, ()=>{
    console.log("server is running on port 6100")
})

exports.app = functions.https.onRequest(app);