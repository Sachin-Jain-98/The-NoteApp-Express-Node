const express = require('express');
const bodyParser = require('body-parser');
const fetch =require('node-fetch');
const app = express();
const cors=require("cors");
const path=require("path");
const uep=bodyParser.urlencoded({extended:false});
const expressLayouts = require("express-ejs-layouts");

/////###### EJS setup ######//////
app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);
app.set('views',path.join(__dirname,'views'));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    fetch("http://localhost:3004/messages")
    .then(response=>{
        response.json().then(json=>{
            res.render('home',{
                articles: json,
                link0: 'add_note',
                link2: ""
            })
        })
    })
    .catch(error=>{
        console.log(error)
    })
})

/////###### CSS Use ######//////
app.use("/css",express.static(__dirname + "/public"))
const jsonParse=bodyParser.json();

app.get("/add_note",(req,res)=>{
    
    res.render('add_note',{
        link1:'add_note',
        link2:"/"
    })
})
app.post("/add_note",uep,(req,res)=>{
    const fname=req.body.sub
    const lname=req.body.note
    const bdy={
        "sub":fname,
        "note":lname
    }
    console.log(bdy)
    fetch("http://localhost:3004/messages",{
        method:'POST',
        body:JSON.stringify(bdy),
        headers:{
            'Content-type':'application/json'
        }
    }).then((response)=>{
        res.redirect("add_note")
    })  
})

///DELETE///
app.delete("/api/delete/:id",(req,res)=>{
    const id=req.params.id
    fetch("http://localhost:3004/messages/"+id,{
        method:"DELETE"
    }).then(response=>{
        res.status(200).send()
    })
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Server is up on port',port)
})