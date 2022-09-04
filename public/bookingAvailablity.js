console.log("hello");
let from_date=document.getElementById('starting_date');

let to_date=document.getElementById('ending_date');

function dates() {
let rate=1000;

let oneday=24*60*60*1000;

let from=from_date.value;

let to=to_date.value;



let diffrence_days=Math.round(Math.abs((from-to)/oneday));

console.log(diffrence_days);

console.log(from,to);
}


