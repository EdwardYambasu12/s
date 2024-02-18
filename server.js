const express = require("express")
const request = require("request")
const router = require("./database")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(router)




app.use(express.urlencoded({extended : false}))




app.listen(6100, ()=>{
    console.log("server is running on port 6100")
})

