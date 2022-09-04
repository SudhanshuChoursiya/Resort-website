const mongoose=require('mongoose');

const signupSchema=new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
        unique:true
    },
      email:{
        type:String,
        required:true,
        unique:true
    },
      password:{
        type:String,
        required:true
    }, 
    is_admin:{
        type:Number,
        default:0        
    }
    
});

module.exports=mongoose.model('usersignup',signupSchema);
