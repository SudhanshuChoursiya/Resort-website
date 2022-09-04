const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const contactDetails=require('../models/contactform.js');
const signup=require('../models/signup.js');
const gallery=require('../models/gallery.js');
const icons=require('../models/icon.js');
const booking=require('../models/bookings.js');
const axios=require('axios');

const bodyparser=require('body-parser');

const bcrypt=require('bcryptjs');

const session=require('express-session');

router.use(session({secret:"choursiyasudhanshu2855",resave:false, saveUninitialized:false}));


router.get('/',(req,res)=>{
let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;
    
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    res.render('home.ejs',{success:success,error:error,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});    
   
    
})

router.get('/home',(req,res)=>{
let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    res.render('home.ejs',{success:success,error:error,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
    
});

router.get('/about',(req,res)=>{
let loggedin=false;
let admin=false;
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    res.render('about.ejs',{loggedin:loggedin,admin:admin});
    
});

router.get('/gallery',async(req,res)=>{
let loggedin=false;
let admin=false; 
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    const galleryphotos=await gallery.find();
    
    res.render('gallery.ejs',{loggedin:loggedin,galleryphotos:galleryphotos,admin:admin});
    
})

router.get('/facilities',async(req,res)=>{
let loggedin=false;
let admin=false;   
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    const iconslogo=await icons.find();
    
    res.render('facilities.ejs',{loggedin:loggedin,icons:iconslogo,admin:admin});
    
})




router.get('/contact',async(req,res)=>{
let loggedin=false; 
const success=false;
const error=false;
let admin=false;
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    res.render('contact.ejs',{success:success,error:error,loggedin:loggedin,admin:admin});
    
});


router.post('/contact',async(req,res)=>{
    var success=false;
    var error=false;
    let loggedin=false;
    let admin=false;
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    var contactData=new contactDetails({
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobileno,
        subject:req.body.subject,
        message:req.body.message
    })
    contactData.save().then(()=>{
    
        success=true;
        
         res.render('contact.ejs',{success:success,error:error,loggedin:loggedin,admin:admin});
       
        
    }).catch((err)=>{
    error=true;
     res.render('contact.ejs',{success:success,error:error,loggedin:loggedin,admin:admin});
     
    })
    
});


router.get('/booking',async(req,res)=>{
let loggedin=false; 
const success=false;
const error=false;
const notavailable=false;
const dateAvailablity=false;
const datenotAvailablity=false;
const min_date_notmatched=false;
const min_date_Availablity=false;
let criteria_notmatched=false;
let admin=false;
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
     const iconslogo=await icons.find();
    
    res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,
datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
    
});



router.post('/booking',async(req,res)=>{
let loggedin=false; 
let success=false;
let error=false;
let notavailable=false;
let dateAvailablity=false;
let datenotAvailablity=false;
let min_date_notmatched=false;
let min_date_Availablity=false;
let criteria_notmatched=false;
let admin=false;

    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
     const iconslogo=await icons.find();
     
     const user_starting_date=req.body.startingdate;
     
     const user_ending_date=req.body.endingdate; 
     let parsed_starting_date=Date.parse(user_starting_date)
     
     let parsed_ending_date=Date.parse(user_ending_date)
     
    let oneday=24*60*60*1000;
      
     //for checking between date
    const startingMatched=await booking.find({starting_date:{$lte:user_starting_date},ending_date:{$gte:user_ending_date}});
    
    //for checking before and after date
    const endingMatched=await booking.find({starting_date:{$gte:user_starting_date},ending_date:{$lte:user_ending_date}});
    
    
     //for checking before and after date
    const StartingEndingMatched=await booking.find({starting_date:{$lte:user_ending_date},ending_date:{$gte:user_starting_date}});
    
     
               
     const bookings=new booking({        
     name:req.body.name, 
     email:req.body.email, 
     mobile_no:req.body.mobileno, 
     booking_type:req.body.bookingfor, 
     starting_date:req.body.startingdate, 
     ending_date:req.body.endingdate,
     message:req.body.message, 
     amount:req.body.amount
     })
     
     
  if(startingMatched.length==0 && endingMatched.length==0 && StartingEndingMatched.length==0){
  
      if (user_starting_date<user_ending_date) {
      
     let type_of_booking=req.body.bookingfor;
     
      
     let date_difference=Math.round(Math.abs(parsed_starting_date-parsed_ending_date)/oneday);
     
     
         if (type_of_booking=='For Marriage') {
                     
          if (date_difference>6) {                    
                                bookings.save().then(()=>{                   
         success=true;         
                              
          res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
             
         }).catch((err)=>{         
                     error=true;
         
              res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
         })
         }else{
             criteria_notmatched=true;
             res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
         }
         }else{
             bookings.save().then(()=>{                   
         success=true;         
                              
          res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
             
         }).catch((err)=>{         
                     error=true;
         
              res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
         })
         }
         }else{
             min_date_notmatched=true;
      
         res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
         }   
      }else{
      notavailable=true;
      
         res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_notmatched:min_date_notmatched,min_date_Availablity:min_date_Availablity,criteria_notmatched:criteria_notmatched})
    }                  
                               
});


router.post('/bookings',async(req,res)=>{
let loggedin=false; 
let success=false;
let error=false;
let notavailable=false;
let dateAvailablity=false;
let datenotAvailablity=false;
let min_date_notmatched=false;
let min_date_Availablity=false;
let criteria_notmatched=false;
let admin=false;

    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    const iconslogo=await icons.find();
    
   const       starting_date=req.body.starting_date;

const ending_date=req.body.ending_date;

    axios.get(process.env.BOOKING_BASE_URL).then((response)=>{
        const bookingsData=response.data;
        
           let startingFind=bookingsData.filter(x=>x.starting_date<=starting_date && x.ending_date>=ending_date);
    
let endingFind=bookingsData.filter(x=>x.starting_date>=starting_date && x.ending_date<=ending_date);

let StartingEndingFind=bookingsData.filter(x=>x.starting_date<=ending_date && x.ending_date>=starting_date);
    
    if (startingFind.length==0 && endingFind.length==0 && StartingEndingFind.length==0){
  
        if (starting_date!=ending_date) {
        dateAvailablity=true;;
            res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_Availablity:min_date_Availablity,min_date_notmatched:min_date_notmatched,criteria_notmatched:criteria_notmatched})
        }else{
            min_date_Availablity=true;
        
         res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_Availablity:min_date_Availablity,min_date_notmatched:min_date_notmatched,criteria_notmatched:criteria_notmatched})
        }
                              
    }else{
        datenotAvailablity=true;
        
         res.render('booking.ejs',{success:success,error:error,loggedin:loggedin,icons:iconslogo,notavailable:notavailable,dateAvailablity:dateAvailablity,datenotAvailablity:datenotAvailablity,admin:admin,min_date_Availablity:min_date_Availablity,min_date_notmatched:min_date_notmatched,criteria_notmatched:criteria_notmatched})
                     
    }
           
}).catch((error)=>{
    console.log(error);
  })                  
                                                                        
});


router.get('/dashboard',(req,res)=>{
let loggedin=false;
let admin=false;
let success=false;
let error=false;
let bookingDetails=true;
let contactDetail=false

    if (req.session.username) {
        loggedin=true;        
    }
    
    if(req.session.admin){
    admin=true;
    axios.get(process.env.BOOKING_BASE_URL).then((response)=>{
        const bookingsData=response.data;
        
        
         res.render('dashboard.ejs',{success:success,error:error,loggedin:loggedin,admin:admin,bookingsData:bookingsData,bookingDetails:bookingDetails,contactDetail:contactDetail})
                     
           
}).catch((error)=>{
    console.log(error);
  })                  
                
    }else{
        res.redirect('/');
    }
    
                                                            
      
})


router.get('/bookings-detail',async(req,res)=>{
let loggedin=false; 
let success=false;
let error=false;
let admin=false;
let bookingDetails=true;
let contactDetail=false;

    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    
    axios.get(process.env.BOOKING_BASE_URL).then((response)=>{
        const bookingsData=response.data;
               
         res.render('dashboard.ejs',{success:success,error:error,loggedin:loggedin,admin:admin,bookingsData:bookingsData,bookingDetails:bookingDetails,contactDetail:contactDetail})
                     
           
}).catch((error)=>{
    console.log(error);
  })                  
              
    }else{
        res.redirect('/');
    }      
                                                              
});


router.get('/contact-detail',async(req,res)=>{
let loggedin=false; 
let success=false;
let error=false;
let admin=false;
let bookingDetails=false;
let contactDetail=true;

    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
           axios.get(process.env.CONTACT_BASE_URL).then((response)=>{
        const contactData=response.data;
                
         res.render('dashboard.ejs',{success:success,error:error,loggedin:loggedin,admin:admin,contactData:contactData,bookingDetails:bookingDetails,contactDetail:contactDetail})
                     
           
}).catch((error)=>{
    console.log(error);
  })   
                 
    }else{
        res.redirect('/');
    }
                                                                         
});





router.get('/api/narayna/resort/bookings',async(req,res)=>{
    
  const bookingData=await booking.find()
    
    res.json(bookingData);
    
});

router.get('/api/narayna/resort/contact',async(req,res)=>{
    
  const contactData=await contactDetails.find()
    
    res.json(contactData);
    
});







router.get('/signup',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;

    
    
    if(req.session.username){
    loggedin=true;
    res.redirect('/');
    }else{
    res.render('signup.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
   }
   
   if(req.session.admin){
    admin=true;
    }
    
});

router.post('/signup',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;
    
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }    
    
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    
            
    if(password==cpassword){
    const hashpassword=await bcrypt.hash(password,10);
    
    const signupData=new signup({
        username:username,
        email:email,
        password:hashpassword
        
    })
       signupData.save().then(()=>{
           console.log("success");
           success=true;
           res.render('signup.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
           
       }).catch((err)=>{
           console.log(err);
           error=true
           res.render('signup.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
           
       })
    }
    else{
        passnotmatch=true;
        
        res.render('signup.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
    };
    
    
});


router.get('/login',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;
 
if(req.session.username){
    loggedin=true;
    res.redirect('/')
}else{
    res.render('login.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
    }
      
    if(req.session.admin){
    admin=true;
    }
    
});

router.post('/login',async(req,res)=>{

let success=false;
let error=false;
let passnotmatch=false;
let loggedin=false;
let admin=false;
 
    if(req.session.username){
    loggedin=true;
    }
    
    if(req.session.admin){
    admin=true;
    }
    
    const username=req.body.username;
    const userpassword=req.body.password;
    
    
  const userMatch=await signup.findOne({username:username});
  
  if(userMatch){
      const passMatch=await bcrypt.compare(userpassword,userMatch.password);
      if(passMatch){
         req.session.username=userMatch.username; 
         
     const admin=userMatch.is_admin;
           
      if (admin==1) {
      req.session.admin=userMatch.is_admin;
      res.redirect('/dashboard');
      }else{      
      res.redirect('/home');
      }
      
      }else{
      passnotmatch=true;
      res.render('login.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});        
      }
  }else{
      error=true;
      res.render('login.ejs',{error:error,success:success,passnotmatch:passnotmatch,loggedin:loggedin,admin:admin});
        
  }
          
});

router.get('/logout',(req,res)=>{
let loggedin=false;

    if(req.session.username){
    loggedin=true;
    req.session.destroy();
    res.redirect('/login');
    }else{
        res.redirect('/login');
    }
    
   
});



router.post('/delete-booking',async(req,res)=>{

let loggedin=false; 
let success=false;
let error=false;
let admin=false;
let bookingDetails=true;
let contactDetail=false;

  if(req.session.username){
    loggedin=true;
    }
   
    
    if(req.session.admin){
    admin=true;       
 const boxid=req.body.boxid;
 try{
      const deleteBooking=await booking.deleteOne({_id:boxid}); 
 } catch(err) {
 console.log(err);     
 }
 axios.get(process.env.BOOKING_BASE_URL).then((response)=>{
        const bookingsData=response.data;
                
         res.render('dashboard.ejs',{success:success,error:error,loggedin:loggedin,admin:admin,bookingsData:bookingsData,bookingDetails:bookingDetails,contactDetail:contactDetail})
                     
           
}).catch((error)=>{
    console.log(error);
  })   
                 
    }else{
        res.redirect('/');
    }
    
});


router.post('/delete-contact',async(req,res)=>{

let loggedin=false; 
let success=false;
let error=false;
let admin=false;
let bookingDetails=false;
let contactDetail=true;

  if(req.session.username){
    loggedin=true;
    }
      
    
    if(req.session.admin){
    admin=true;
 const boxid=req.body.boxid;
 try{
     const deletecontact=await contactDetails.deleteOne({_id:boxid}); 
 } catch(err) {
     console.log(err);
 }

       axios.get(process.env.CONTACT_BASE_URL).then((response)=>{
        const contactData=response.data;
                
         res.render('dashboard.ejs',{success:success,error:error,loggedin:loggedin,admin:admin,contactData:contactData,bookingDetails:bookingDetails,contactDetail:contactDetail})
                     
           
}).catch((error)=>{
    console.log(error);
  })   
                 
    }else{
        res.redirect('/');
    }
    
})


router.get('*',(req,res)=>{
    
    res.render('notfoundpage.ejs')
})

module.exports=router;
