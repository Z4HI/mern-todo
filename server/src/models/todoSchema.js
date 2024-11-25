
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: String,
  todos:[
    {
      checked:Boolean,
      text:String
    },
  ]

});


const todoModel = mongoose.model("todos",todoSchema);


export default todoModel;