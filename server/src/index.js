import express from 'express';
import mongoose  from 'mongoose';
import todoModel from './models/todoSchema.js';
import userModel from './models/userSchema.js';
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

const port = 5000

app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});
    if(user) {
        res.status(500);
        res.json({
            message:"User exists"
        })
        return;
    }
    const newUser = await userModel.create({username,password});
        res.json(newUser)
})
app.post('/login',async (req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({username});
    if(!user || user.password !== password) {
        res.status(400)
        res.json({
            message:"Invalid login"
        });
        return;
    }
    res.json({
        message : "Success",
    })
})

app.post('/todos', async (req,res) =>{
    const {authorization} = req.headers;
    const [x,token] = authorization.split(" ")
    const [username,password] = token.split(":")
    const todoItems = req.body

    const user = await userModel.findOne({username});

    if(!user || user.password !== password) {
        console.log("invalid creds")
        res.json({
            message:"Invalid login"
        });
        return;
    }
    const todos = await todoModel.findOne({userId: user._id})
    if(!todos){
        await todoModel.create({
            userId: user._id,
            todos:todoItems
        })
        
    }else{
        todos.todos = todoItems
        await todos.save()
    }
})
app.get('/todos', async (req,res) =>{
    const {authorization} = req.headers;
    const [x,token] = authorization.split(" ")
    const [username,password] = token.split(":")
    const user = await userModel.findOne({username});

    if(!user || user.password !== password) {
        console.log("invalid creds")
        res.json({
            message:"Invalid login"
        });
        return;
    }
    const todos = await todoModel.findOne({userId: user._id})
   return res.json(todos)
})


app.get('/',(req,res) =>{
    res.send("hello world")
})
app.get('/hello',(req,res) =>{
    res.send("yes?")
})

mongoose.connect(
    'mongodb+srv://zahizuhair:zahi123@todolist.t0axn.mongodb.net/?retryWrites=true&w=majority&appName=TodoList'
).then(()=>{
    console.log('connected')
    app.listen(port)
})




//mongo pw 3e8wuyP6T0LIK7un