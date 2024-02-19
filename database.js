const mongoose = require ("mongoose")
const express = require("express")
const router = express.Router()


const multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() ;
    cb(null,uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })



 
 try{
mongoose.connect("mongodb+srv://yambasuedward4:naECTVIDG1tvKXVH@cluster0.r3tannh.mongodb.net/Sportsup", {
 useNewUrlParser: true,

//mongodb+srv://yambasuedward4:naECTVIDG1tvKXVH@cluster0.r3tannh.mongodb.net/Sportsup
})
}
catch(e){
    console.log(e)
}
router.use(express.urlencoded({extended : false}))

signSchema =   mongoose.Schema({


        email : {
            type : String,
            required : true,
            validator : (v)=>{
                console.log(validator)
            }
        },

        password : {
            type : String,
            required : true,
      
        },

        confirm_password : {
            type : String,
            required : true, 
            
    
                
        },
        pinned_matches : {
            type : Array,

        },
        favorite_leagues : {
            type : Array
        },

        favorite_players : {
            type : Array
        },
        favorite_teams : {
            type : Array 
        }


})

const newsSchema = mongoose.Schema({
    body : {

    },
    author : {

    },
    source : {

    },
    image : {

    },
    image_buffer : {
        type : Object,
        required : true
    },
    date : {

    },
    time : {

    },
})
 let max 
 const model1 = new mongoose.model("News", newsSchema)

const model = new mongoose.model("Signer", signSchema)



router.post("/news", upload.single("image"), async (req, res)=>{

    let d = new Date()
    console.log(req.body.name)
    console.log(req.body)
    const imageName = req.file.filename
const today_date = d.toISOString().split('T')[0]
console.log(today_date)

const main = d.toLocaleTimeString();
console.log(main)


    const media = new model1({
        body : req.body.news_body,
        author : req.body.news_author,
        source : req.body.news_source,
        image :  imageName,
        image_buffer : req.body.buffer_image,
        date : today_date,
        time : main
    })

    media.save()

    await model1.find().then(data=> console.log(data))


})

router.post("/sign-in", async(req, res)=>{
    console.log(req.body)
    console.log("been called")
    console.log(req.body.email_reader)

   
	const password = req.body.password_reader
    const validator =  await model.find({email : req.body.email_reader})

    if (validator.length > 0){
     
        console.log("Email have been used")
       max =     {
                text : "Email have been used",
                state : "error"
            }
    }
    else{
        const sender = new model({
                email : req.body.email_reader,
                password : password,
                confirm_password : password  
            })
           max = {
                text : "Logged in successfully",
                state : "success"
            }

            await sender.save()
             const searcher = await model.find()
             console.log(searcher)

  
    }
            
            })
      router.get("/login_answer", (req, res, next)=>{
            res.json(
        max)
})



///////////////Retrieveing Logging Data ////////////////////////////
    let json;


async function logger (req, res, next){







    const email = req.body.email_reader
    const password = req.body.password_reader
    
///
let search =  await model.find({email : email})

console.log(search)
   console.log(search.length)
if (search.length >= 1){

        const encrypted = search[0].password
        const raw =  password


        if (raw == encrypted){
            console.log(pass)
            console.log("User have successfully logged in")
      
 
                  json =     {
                text : "Logged in successfully",
                state : "successs"
            }
            router.get(`/sportsup/${raw}/user/${email}`,  (req, res, next)=>{
 
                

                user_api = model.find({email : email}).then((it)=>{
                res.json(it)
               
                })
         
                  
                        json = {
                    message : "Logged In Successfully",        
                    state : "success"
                        }
    
                

                
        }
        )
        
        }
        else if (raw != encrypted){
            console.log("Please Check your email or password")

       json =     {
                text : "Please Check your email or password",
                state : "error"
            }
         
        }
        

  
}
else if (search.length == 0){
    console.log("Please Check your email or password")


       json = {
        state : "error",
        text : "Please check password or email"
       }
        }
        


/*
let map = search.map((item)=>{
    console.log(item.first_name)
})

    console.log("login has been called")

    let filter = search.filter((item)=> item.first_name === "Edward,"

)  
*/


    router.get("/ans", (req, res)=>{
      res.json(json)
    })


}

router.post("/login-info", logger)



router.post("/pinned_recieve/:login_email", async(req, res)=>{
    const finding = await model.find({email : req.params.login_email})
    console.log(req.body)
    console.log(finding[0].id)
    const poster= finding[0].pinned_matches
   
    const id = await model.findByIdAndUpdate(finding[0].id, {pinned_matches : [...poster, req.body]})

    console.log(id)
    
               
})
router.get("/sportsup/user/:email",  (req, res)=>{
 
                

               model.find({email : req.params.email}).then((it)=>{
                res.json(it) })

           })



router.get("/news_rededicate", (req, res)=>{
    var item 

            model1.find().then(response => res.json(response))

       
})
               
        

module.exports = router

