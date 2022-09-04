const mongoose=require('mongoose');

const iconsSchema=new mongoose.Schema({
    
    icon_src:{
        type:String
    }, 
    icon_title:{
        type:String
    }
    
});

module.exports=mongoose.model('icon',iconsSchema);
