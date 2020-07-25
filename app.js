const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const port=80;
app.use(express.urlencoded());

app.use('/static',express.static('static'));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const con="this is the best website on internet";
    const params={'title':'MYGym','content': con};
    res.status(200).render('index.pug',params);
});

app.post('/',(req,res)=>{
    name=req.body.name;
    age=req.body.age;
    email=req.body.email;
    gender=req.body.gender;
    locality=req.body.locality;
    date=req.body.date;
    goal=req.body.goal;
    // let op=`the name of the client is ${name},${age},${gender} of ${locality} joined on ${date} and his/her goal is ${goal}`;
    let ans={
        name:`${name}`,
        age:`${age}`,
        email:`${email}`,
        gender:`${gender}`,
        locality:`${locality}`,
        date:`${date}`,
        goal:`${goal}`,
    }
    let myJSONstr=JSON.stringify(ans);
    fs.writeFileSync('output.txt',myJSONstr);
    const params={'message':'successful submission'};
    res.render('index.pug',params);
    console.log(req.body);
});

app.listen(port,()=>{
    console.log(`the app is started at port ${port}`);
    
});