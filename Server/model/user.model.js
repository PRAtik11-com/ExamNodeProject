const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
         minlength: 8,
         validate: {
         validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(v);
      },
      message: props => `Password must contain uppercase, lowercase letters, and one number.`
    }
    },
    age :{
        type:Number,
        required : true
    },
    city: {
       type: String,
       required: true
    } 
})

const userModel= mongoose.model("user",userSchema)

module.exports = userModel

