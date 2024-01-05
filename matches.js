const express = require("express")
const request = require("request")

const Route = express.Router()


//TODAY MATCHES
Route.get("/Today_matches", (req, res)=>{
    const options = {
        url : "https://api.football-data.org/v4/matches/",
        method : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
        res.json(json)
    })
})
//Single Match
Route.get("/single_match/:id", (req, res)=>{
    
    let {id} = req.params
    console.log(id)

    const options = {
        url : "https://api.football-data.org/v4/matches/"+id,
        mehtod : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    console.log(options.url)
    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
        res.json(json)
    })

})
//Matches H2H

Route.get("/h2h/:id", (req, res)=>{
    
    let {id} = req.params
    console.log(id)

    const options = {
        url : "https://api.football-data.org/v4/matches/"+id+"head2head",
        mehtod : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    console.log(options.url)
    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
        res.json(json)
    })

})

//Matches of Team

Route.get("/matches/:id", (req, res)=>{
    
    let {id} = req.params
    console.log(id)

    const options = {
        url : "https://api.football-data.org/v4/teams/"+id+"/matches/",
        mehtod : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    console.log(options.url)
    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
        res.json(json)
    })

})


module.exports = Route