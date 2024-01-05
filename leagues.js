const express = require("express")
const request = require("request")

const Route = express.Router()

const ids = [
    2016,2021,2013,2001,2018,2015,2002,2019,2003,2017,2152,2014,2000
]


let matches_inner = []
var available_leagues 
let chapionshuip
let Premier_League
let Laliga
let Seria_A
let Bundaliga
let TOP_SCORER
let Teams_available
let Standings
let matches
let l_tables = []

const h2= []
const h2_re = []

//LALIGA MATCHES AND INFOS





function Afcon(){


}
Afcon()



function fetcher(){
   
    function ma(){
       
    }      
    
    

    ma()  
    setTimeout(fetcher, 30000)
}




//H2H

function H2H_FUNC(){
    const options = {
        url : "https://api.football-data.org/v4/matches",
        mehtod : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    
    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
        matches = json
       console.log(matches)
        
     matches.matches.map((item)=>{

        //h2h fetcher
        const options = {
            url : "https://api.football-data.org/v4/matches/"+item.id+"/h2h",
            mehtod : "GET",
            headers : {
                'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
            }
        }
    
        console.log(options.url)
        request(options, (err, mid, body)=>{
            json = JSON.parse(body)
            h2_re.push(json)
           console.log(matches)

     })
        })
    


}    )  }


H2H_FUNC()

function av(){

 
    const options = {
        url : "https://api.football-data.org/v4/competitions/",
        mehtod : "GET",
        headers : {
            'X-Auth-Token': '254a8b34b92543439335ce771fcff930', 'Accept-Encoding': ''
        }
    }

    console.log(options.url)
    request(options, (err, mid, body)=>{
        json = JSON.parse(body)
       available_leagues = json
       console.log(available_leagues)
    })


    }

    av()



function idm(){
    l_tables = []
    ids.map((item)=>{
        console.log(item)
    
        const options = {
            url : "https://api.football-data.org/v4/competitions/"+item+"/standings",
            mehtod : "GET",
            headers : {
                'X-Auth-Token': 'b4038c75745c463aba0ca5d4adcaa01c', 'Accept-Encoding': ''
            }
        }
    
        console.log(options.url)
        request(options, (err, mid, body)=>{
            json = JSON.parse(body)
           l_tables.push(json)
           console.log(available_leagues)
        })
    
    })
    
}
setTimeout(idm, 10000)




   
function main(){
    barber = "divide"

    setTimeout(main, 60000)
}

setTimeout(fetcher, 5000)



Route.get("/trial", (req, res)=>{
    res.send(l_tables)
})

//LIST OF AVALIABLE LEAGUES

Route.get("/avalable_leagues", (req, res)=>{
    res.json(available_leagues)
    
})




Route.get("/h2h", (req, res)=>{
    res.send(h2_re)
})

// 

Route.get("/main_matches", (req, res)=>{
    res.json(matches)

})

//LEAGUE TABLE


module.exports = Route