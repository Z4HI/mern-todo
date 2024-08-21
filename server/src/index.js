import express from 'express';
import mongoose  from 'mongoose';
import todoModel from './models/todoSchema.js';
const app = express()

app.use(express.json())

app.post('/todo', async (req,res) =>{
    console.log(req.body)
    const todo = new todoModel({
        title: req.body.title
    });
    const newItem = await todo.save()
    res.json(newItem)
})
app.get('/',(req,res) =>{
    res.send("hi")
})


mongoose.connect(
    'mongodb+srv://zahizuhair:zahi123@todolist.t0axn.mongodb.net/?retryWrites=true&w=majority&appName=TodoList'
).then(()=>{
    console.log('connected')
    app.listen(5000)
})




//mongo pw 3e8wuyP6T0LIK7un