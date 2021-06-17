const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/todoApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true 
})
const Todo = mongoose.model('Todo',{
    uid: Number,
    username: String,
    password: String,
    ltodos:Array 
})
module.exports={
    Todo
}