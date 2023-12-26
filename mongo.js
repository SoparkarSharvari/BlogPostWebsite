const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})

const newSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      },
    
},{ timestamps: true })

const newSchema2 = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tagline:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    likes:[{type:String,ref:"collection"}],
    saved:[{type:String,ref:"collection"}],
})
const newSchema3 = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("collection",newSchema)
const collection2 = mongoose.model("collection2",newSchema2)
const collection3 = mongoose.model("collection3",newSchema3)

module.exports = {
    collection,
    collection2,
    collection3
  };