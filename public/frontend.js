let alert_box=document.querySelector('.alert_box');


let starting_date=document.getElementById('starting_date');


let ending_date=document.getElementById('ending_date');


let user_starting_date=document.getElementById('booking_starting_date');


let user_ending_date=document.getElementById('booking_ending_date');


let rate_value=document.getElementById('rate');

let amount_value=document.getElementById('amount_value');

let booking_type=document.getElementById('booking_type');

let hint_message=document.getElementById('hint');


function alerts() {
    alert_box.style.display='none'    
}

setTimeout(alerts,10000);



let today_date=new Date();

let dd=String(today_date.getDate()).padStart(2,'0');

let mm=String(today_date.getMonth()+1).padStart(2,'0');

let yyyy=today_date.getFullYear();

let formated_today_date=yyyy+ '-' + mm + '-' + dd ;


let tommorow_date=new Date();

tommorow_date.setDate(tommorow_date.getDate()+1);

let nextdd=String(tommorow_date.getDate()).padStart(2,'0');

let nextmm=String(tommorow_date.getMonth()+1).padStart(2,'0');

let nextyyyy=tommorow_date.getFullYear();


let formated_tommorow_date=nextyyyy + '-' +nextmm + '-' + nextdd ;

starting_date.value=formated_today_date;

ending_date.value=formated_tommorow_date;



starting_date.setAttribute('min',formated_today_date);

ending_date.setAttribute('min',formated_today_date);

user_starting_date.setAttribute('min',formated_today_date);

user_ending_date.setAttribute('min',formated_today_date);


hint_message.style.display='none';
let BookingType=0;
function hintMsg() {
    BookingType=booking_type.value;
    if (BookingType=='For Marriage') {
    hint_message.style.display='inline';
    }else{  
    hint_message.style.display='none';
    }
}



rate_value.style.display='none';
function dates() {
let rate_per_day=0;

let oneday=24*60*60*1000;

let from_date=user_starting_date.value;


let to_date=user_ending_date.value;

let from=Date.parse(from_date);

let to=Date.parse(to_date);

 


let diffrence_days=Math.round(Math.abs((from-to)/oneday));


if (BookingType=='For Marriage') {
rate_per_day=25000;
if (from_date>to_date) {
    rate_value.style.display='none';
}
    if (diffrence_days<7) {
        rate_value.style.display='none';
    }else{
let total_amount=rate_per_day*diffrence_days;


if (total_amount>0) {

   rate_value.innerHTML="Total Amount -/ ₹"+total_amount;
   
   rate_value.style.display='inline';

amount_value.setAttribute('value',total_amount);

}else{
rate_value.style.display='none';
}
}
}if(BookingType=='For other Function'){
    rate_per_day=10000;
   
let total_amount=rate_per_day*diffrence_days;


if (total_amount>0) {

   rate_value.innerHTML="Total Amount -/ ₹"+total_amount;
   
   rate_value.style.display='inline';

amount_value.setAttribute('value',total_amount);

}else{
rate_value.style.display='none';
}
}


if (from_date>to_date) {
    rate_value.style.display='none';
}

}


