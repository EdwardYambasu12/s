const express = require("express")
const request = require("request")
const matches = require("./matches")
const cors = require("cors")
const data = require("./data")
const app = express()
app.use(cors())
app.use(data)
app.use(matches)





app.listen(6100, ()=>{
    console.log("server is running on port 6100")
})