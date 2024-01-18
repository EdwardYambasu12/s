const functions = require("firebase-functions")
const express = require("express")
const app = express()
const cors = require("cors")
const data = require("./data")
app.use(cors())
app.use(data)


app.get("/", (req, res)=>{
    res.status(200).send({data : "world hellos"})
})

exports.app = functions.https.onRequest(app);
