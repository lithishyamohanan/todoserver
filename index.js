const express=require('express');
const session =require('express-session')
const dataService=require('./services/data.service')
const app=express();

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("This is a get method")
})
app.post('/register',(req,res)=>{
    dataService.register(req.body.uid,req.body.uname,req.body.pswd)
    .then(result=>{
     res.status(result.statusCode).json(result)
     // res.status(200).send("success")
    })
 });
 app.post('/login',(req,res)=>{
    dataService.login(req,req.body.uid,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/save',(req,res)=>{
    //  console.log(req.body)
    dataService.save(req.body.uid,req.body.pswd,req.body.ltodo)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/view',(req,res)=>{
    //  console.log(req.body)
    dataService.view(req)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.post('/deletetodo',(req,res)=>{
    //  console.log(req.body)
    dataService.deletetodo(req,req.body.index)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
});
app.listen(3000,()=>{
    console.log("server started at port: 3000")
})
