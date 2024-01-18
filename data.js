const express = require("express")
const request = require("request")
const ids = require("./list_of_leagues")


//Variables

let list_of_matches 
let standings = []
let competitions = []
let h2h = []
let players
const data = express.Router()
let previous 
let next
let d = new Date()

let api_key = "d1872d2c1145e86d9b321ed826416316b9813191e72cde2cb6b3b16206fd4aa9"

const today_date = d.toISOString().split('T')[0]
console.log(today_date)

const tomorrow_setup = new Date(d)
tomorrow_setup.setDate(d.getDate()+1)
const tomorrow_date = tomorrow_setup.toISOString().split('T')[0]
console.log(tomorrow_date)

const yesterday_setup = new Date(d)
yesterday_setup.setDate(d.getDate()-1)
const yesterday = yesterday_setup.toISOString().split("T")[0]
console.log(yesterday)
let num = 0
//FUNCTIONAL DATAS
function Matches(){
    console.log("called", num++)
    const options1 = {
        url : "https://apiv3.apifootball.com/?action=get_events&from="+yesterday+"&to="+yesterday+"&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options1, (err, res)=>{

   
        let json = JSON.parse(res.body)

        previous = json

    })

    const options = {
        url : "https://apiv3.apifootball.com/?action=get_events&from="+today_date+"&to="+today_date+"&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, res)=>{

   
        let json = JSON.parse(res.body)

        list_of_matches = json

    
    })


    const options2 = {
        url : "https://apiv3.apifootball.com/?action=get_events&from="+tomorrow_date+"&to="+tomorrow_date+"&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options2, (err, res)=>{

   
        let json = JSON.parse(res.body)

        next = json

    })
 setTimeout(Matches, 30000)

}
Matches()




function Competition(){
    const options = {
        url : "https://apiv3.apifootball.com/?action=get_leagues&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, res)=>{

   
        let json = JSON.parse(res.body)
   
        competitions = json
     
    })

}

Competition()



//LIST OF MATCHES
data.get("/matches", (req, res)=>{
    res.json(list_of_matches)
})


//STANDINGS
data.get("/standings/:id", (req, res)=>{
        const options = {
        url : "https://apiv3.apifootball.com/?action=get_standings&league_id="+req.params.id+ "&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, body)=>{

   
        let json = JSON.parse(body.body)
   
        res.json(json)
     
    })
})

//COMPETITIONS
data.get("/competitions", (req, res)=>{
    res.json(competitions)
})
//YESTERDAY MATCHES
data.get("/yesterday", (req, res)=>{
    res.send("yesterday")
})
//NEXT
data.get("/tomorrow", (req, res)=>{
    res.json(next)
})
//PLAYERS
data.get("/players/:player_id", (req, res)=>{
    console.log(req.params.player_id)
    const options = {
        url : "https://apiv3.apifootball.com/?action=get_players&player_id="+req.params.player_id+ "&APIkey="+api_key,
        mehtod : "GET",
    }
    console.log(options.url)
    request(options, (err, body)=>{

   
        let json = JSON.parse(body.body)
   
       res.json(json)
    })
})
//CALENDER
data.get("/calendar/:date", (req, res)=>{
   
    const options = {
        url : "https://apiv3.apifootball.com/?action=get_events&from="+req.params.date+"&to="+yesterday+ "&APIkey="+api_key,
        mehtod : "GET",
    }
    console.log(options.url)
    request(options, (err, body)=>{

   
        let json = JSON.parse(body.body)
   
       res.json(json)
    })
})


//H2H
data.get("/h2h/:hometeam/:awayteam", (req, res)=>{
    console.log(req.params)
    const options = {
        url : " https://apiv3.apifootball.com/?action=get_H2H&firstTeamId= "+ req.params.hometeam+"&secondTeamId="+ req.params.awayteam + "&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, body)=>{

        let json = JSON.parse(body.body)
   
        res.json(json)
     
    })

})

data.get("/live_comments/:id", (req, res)=>{
    console.log(req.params)
    const options = {
        url : "https://apiv3.apifootball.com/?action=get_live_odds_commnets&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, body)=>{

        let json = JSON.parse(body.body)
   
        res.json(json)
     
    })

})


data.get("/live_matches", (req, res)=>{
    console.log(req.params)
    const options = {
        url : "https://apiv3.apifootball.com/?action=get_events&match_live=1&from="+today_date+"&to="+today_date+"&APIkey="+api_key,
        mehtod : "GET",
    }

    request(options, (err, body)=>{

        let json = JSON.parse(body.body)
   
        res.json(json)
     
    })

})

module.exports = data