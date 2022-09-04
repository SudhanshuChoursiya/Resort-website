const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
   
    name:{
        type:String,
        required:true  
    },
    email:{
        type:String,
        required:true  
    },
    mobile_no:{
        type:String,
        required:true  
    },
    booking_type:{
        type:String,
        required:true  
    },
    starting_date:{
        type:String,
        required:true  
    },
    ending_date:{
        type:String,
        required:true  
    }, 
    message:{
        type:String, 
    },
    amount:{
        type:String
    }, 
    status:{
        type:String,
        default:'booked'
    }
    
});

module.exports=mongoose.model('booking',bookingSchema);
