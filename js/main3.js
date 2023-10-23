// ------------------------ get variables from HTML file ------------------------------------
let all_input = document.querySelectorAll('input');
let submit_btn = document.querySelector('#submit');
let drop_down = document.querySelectorAll('select');
let checkbox_field = document.querySelectorAll('#familiarity input');
let state_field = document.querySelector('#province select');
let email_field = document.querySelector('#email');
let mobile_field = document.querySelector('#mobile');
let education_field = document.querySelector('#education');
let education2_field = document.querySelector('#education-2');
let road_map_field = document.querySelector('#selectedField');
let reagent_field = document.querySelector('#familiarity');
let first_part = document.querySelector('.part1');
let second_part = document.querySelector('.part2');


// ------------------define the error function for invalid inputs--------------------------------------
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success')
}

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};


//----------------------------- check validation of inputs -------------------------------------------
// email validation
email_field.addEventListener('keyup', ()=>{
  const isValidEmail = email_field => {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email_field).toLowerCase());
   }
   const emailvalue = email_field.value.trim();
   if(!isValidEmail(emailvalue)){
     setError(email_field, 'ایمیل به درستی وارد نشده است');
   }else{
     setSuccess(email_field)
  }
  });


// validation for phone number field
mobile_field.addEventListener('keyup',()=>{
  let mobile = mobile_field.value
  if(mobile.length !=11 ){
    setError(mobile_field, 'شماره تلفن به درستی وارد نشده است');
  }else{setSuccess(mobile_field);}
});


//   // ------------------------------------------------------------------------------
//   // #education field 
//   education_field.addEventListener('click' , (select) =>{
//     let part_1 = document.querySelector('.part1');
//     let part_2 = document.querySelector('.part2');

// // console.log(part_1);
//     if (select.target.value == "دانش آموز")
//       {
//         part_1.style.display = "block";
//         part_2.style.display = "none";

//       }
//     else if(select.target.value == "دانشجوی کاردانی" || 
//         select.target.value == "دانشجوی کارشناسی" ||
//         select.target.value == "دانشجوی کارشناسی ارشد" ||
//         select.target.value == "دانشجوی دکتری")
//          {
//           part_2.style.display = "block";
//           part_1.style.display = "none";
//         }
//     else {
//       part_1.style.display = "none";
//       part_2.style.display = "none";}
//   });


///

// function showHastam(){
//   var hasDocumentElements = document.querySelectorAll('.nistam');
//   for(let elem of hasDocumentElements){
//       first_part.required = true;
//       first_part.required = true;
//       employmentTimeCommitment.required = true;
//       employmentType.required = true;
//   }
// }




