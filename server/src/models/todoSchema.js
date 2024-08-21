
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: String,

});


const todoModel = mongoose.model("todo",todoSchema);


export default todoModel;