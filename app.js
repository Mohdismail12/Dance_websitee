const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/contactDance',
    {
        useNewUrlParser: true,
        // useUnifieldTopology: true,
        // useFindAndModify: false
        useUnifiedTopology: true
    });
const port = 3000;
const contactSchema = new mongoose.Schema({
        name: String,
        phone: String,
        email: String,
        address: String,
        desc: String
      });


const Contact = mongoose.model('Contact', contactSchema);     


// EXPRESS SPECIFIC STUFF
app.use  ('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get("/contact", (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
});


app.get("/contact",(req,res)=>{
    res.render("contact");
  })
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(req.body);
    myData.save().then(()=>{
      res.send(" The data has been sucessfully submit")
    }).catch(()=>{
      res.status(400).send("item was not saved to the databse")
});
// app.post('/contact',async(req, res) => {
//     try{
//       const UserData = new Usernew(req.body);
       
//       await UserData.save();
//       res.status(201).send("This item has been saved to the database");
//     }catch(e){
//       res.status(500).send(e);
//     }
  })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});