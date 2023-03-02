const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs')
const port=process.env.port ||3000;
const mypublic=path.join(__dirname,"../public");
const mypartials=path.join(__dirname,"../partials");
app.use(express.static(mypublic))
app.set('view engine',"hbs");
hbs.registerPartials(mypartials);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
mongoose.set('strictQuery',true);
await mongoose.connect('mongodb://127.0.0.1:27017/info');
};
const contactschema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    mobileno:Number,
    emailid:String,
    yourmessage:String
  });
  const Kitten = mongoose.model('Kitten',contactschema);

// ADMIN SCHEMA SET HERE
const adminschema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    mobileno:Number,
    emailid:String,
    password:String,
    yourmessage:String
  });
  const admin = mongoose.model('admin',adminschema);
app.get("/",(req,res)=>{
const params={}
res.render('index')
})
app.get("/log",(req,res)=>{
const params={}
res.render('log')
});
app.get("/admin",(req,res)=>{
res.render('admin')
})

app.post("/log",async(req,res)=>{

const emailid=req.body.emailid
const password=req.body.password
const check=await admin.findOne({emailid})
if(check.emailid===emailid){
if(check.password==password){

res.send("successful")

}
else{

res.send('Not match')

}
}
else{

res.send('email id not match')
}

})

app.post("/admin",async(req,res)=>{
  const silence = new admin(
    { 
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        mobileno:req.body.mobileno,
        emailid:req.body.emailid,
        password:req.body.password,
    
    });
    silence.save()
    res.render('log')
})

app.post('/',async(req,res)=>{
const silence = new Kitten(
{ 
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    mobileno:req.body.mobileno,
    emailid:req.body.emailid,
    yourmessage:req.body.yourmessage

});
silence.save()
res.render('log')


})
app.listen(port);