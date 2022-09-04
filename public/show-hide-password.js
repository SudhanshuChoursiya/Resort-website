let eyeIcon=document.getElementById('eye_icon');

let passwordInput=document.getElementById('password_input');



eyeIcon.addEventListener('click',()=>{

if (passwordInput.type=='password') {
  passwordInput.setAttribute('type','text')
  
  eyeIcon.classList.replace('fa-eye','fa-eye-slash')
  
}else{
    passwordInput.setAttribute('type','password');
    
    eyeIcon.classList.replace('fa-eye-slash','fa-eye')
}   
        
});