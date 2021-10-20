const express=require('express');
const fs=require('fs');
const path=require('path');

const port=80;
const app=express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/GymForm', {useNewUrlParser: true,  useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const FormSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    locality: String,
    joining_data: Date,
    goal: String
  });

const Form = mongoose.model('Form', FormSchema);

// express commands

app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug commands
app.set('view engine','pug');
app.set('views', path.join(__dirname,'views'));

//endpoints
app.get('/',(req,res)=>{
    const t="My Gym";
    const con="Join the best gym in Delhi";
    const params={'title':t,'constant':con};
    res.status(200).render('index.pug',params);
})

 app.post('/',(req,res)=>{
    Name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.locality
    date=req.body.date
    goal=req.body.goal

    //saving the data into database Form
    var myData=new Form(req.body);
    myData.save().then(()=>{
        res.send('this is saved')
    }).catch(()=>{
        res.status(400).send('could not save to db')
    });

    const params={'message':'thanks for submitting the form'};
    res.status(200).render('index.pug',params);

    //const optowrite=`the name of the client is ${Name}, ${age} years old, ${gender}, residing in ${address}. Date of joining is ${date} and goal is ${goal}`;
    //fs.writeFileSync('output.txt',optowrite);

})

//server start
app.listen(port,()=>{
    console.log(`The app is running at port ${port}`);
})