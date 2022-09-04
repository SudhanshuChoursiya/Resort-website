const mongoose=require('mongoose');

const gallerySchema=new mongoose.Schema({
    
    image_src:{
        type:String
    }
    
});

module.exports=mongoose.model('gallery',gallerySchema);