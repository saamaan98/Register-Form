"use strict";
// Function to validate and highlight empty fields
function highlightField(field) {
  field.style.border = '1.5px solid red';
}

function unHighlightField(field) {
  field.style.border = '1px solid grey';
}

function hideBorder(field) {
  field.style.border = '0px';
}

function validateAndHighlightEmptyFields(fields) {
  let emptyCount = 0;

  fields.forEach(field => {
    if (!field.value) {
      emptyCount++;
      highlightField(field);
    } else {
      unHighlightField(field);
    }
  });

  return emptyCount;
}

function validateAndHighlightEmptySelectFields(fields) {
  let emptyCount = 0;
  fields.forEach(field => {
    let selectedButton = field.querySelector('input[type="radio"]:checked');
    if (!selectedButton) {
      emptyCount++;
      highlightField(field);
    } else {
      hideBorder(field);
    }

  });
  return emptyCount;
}


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let familiarity = document.querySelector("#familiarity");
let selectedField = document.querySelector("#selectedField");

const familiarityOptions = document.querySelectorAll('.familiarity-option');
let familiarityValue = null;
let selectedFieldValue = null;
let selectedCharityName = null;
const familiarityOtherField = document.querySelector("#refer");
const careerPathwayOtherField = document.querySelector("#careerPathwayOther");
const charitySelectionDiv = document.querySelector('#charityName');
let selectedFamiliarity;
let selectedFieldOptions;
populateCareerPathways('careerPathWayOptions');
populateCharityNameOptions('charityName');

function showDropDown(field) {
  field.parentElement.style.display = "block";
  field.style.display = "block";
  field.setAttribute("required", true);
  field.classList.add("validate-dropdown");
}
function hideDropDown(field) {
  field.parentElement.style.display = "none";
  field.style.display = "none";
  field.setAttribute("required", false);
  field.classList.remove("validate-dropdown");
  field.value = null;
}

function showInput(field) {
  field.parentElement.style.display = "block";
  field.setAttribute("required", true);
  field.classList.add("validate-input");
  field.style.display = "block";

}
function hideInput(field) {
  field.parentElement.style.display = "none";
  field.setAttribute("required", false);
  field.classList.remove("validate-input");
  field.value = "";
  field.style.display = "none";
}

familiarityOptions.forEach(option => {
  option.addEventListener('click', () => {
    familiarityValue = option.value;
    if (familiarityValue === "موسسات نیکوکاری") {
      
      showDropDown(charitySelectionDiv);
      hideInput(familiarityOtherField);

    } else if (familiarityValue === "other" || familiarityValue === "معرف") {
      showInput(familiarityOtherField);
      hideDropDown(charitySelectionDiv);
    } else{
      hideDropDown(charitySelectionDiv);
      hideInput(familiarityOtherField);
    }

    hideBorder(familiarity);
  });


});



const educationField = document.querySelector("#education");
const familiarityField = document.querySelector("#familiarity");
const selectedFieldInput = document.querySelector("#selectedField");

educationField.addEventListener("change", (select) => {
  let educationValue = select.target.value;
  const uniSemesterField = document.querySelector("#uniSemester");
  const highSchoolYearField = document.querySelector("#highSchoolYear");

  if (educationValue.startsWith("دانشجو")) {
    showDropDown(uniSemesterField);
    hideDropDown(highSchoolYearField);

  } else if (educationValue.startsWith("دانش آموز")) {
    showDropDown(highSchoolYearField);
    hideDropDown(uniSemesterField);
  } else {
    hideDropDown(highSchoolYearField);
    hideDropDown(uniSemesterField);

  }

});





const allInputFields = [...document.querySelectorAll('input'),
...document.querySelectorAll('select')];

allInputFields.forEach(field => {
  field.addEventListener('change', () => {
    if (field.value || field.target?.value) {
      unHighlightField(field);
    } else if (field.classList.contains("validate-input") || field.classList.contains("validate-dropdown")) {
      highlightField(field);
    }
  });
});


// ----------------------------- set action for submit button-----------------------

var isSubmit = false;


submit_btn.addEventListener('click', () => {

  // Gather all input fields and dropdowns that need validation
  const allInputFields = [...document.querySelectorAll('.validate-input')];
  const allDropdowns = [...document.querySelectorAll('.validate-dropdown')];
  const allSelectFields = [...document.querySelectorAll('.validate-selectfield')];

  const emptyInputCount = validateAndHighlightEmptyFields(allInputFields);
  const emptyDropdownCount = validateAndHighlightEmptyFields(allDropdowns);
  const emptySelectfieldCount = validateAndHighlightEmptySelectFields(allSelectFields);

  // Calculate total empty fields
  const totalEmptyFields = emptyInputCount + emptyDropdownCount + emptySelectfieldCount;


  if (totalEmptyFields > 0) {
    alert('لطفا تمام بخش های فرم را تکمیل نمایید ');
  } else {

    console.log(document.getElementById("firstName").value)
    console.log(document.getElementById("family").value)

    var raw = JSON.stringify({
      // registrationCode: "oha6-efjlefw-9846ads",
      firstName: document.getElementById("firstName").value,
      family: document.getElementById("family").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      province: document.getElementById("province").value,
      city: document.getElementById("city").value,
      birthDate: document.getElementById("birthDate").value,
      education: document.getElementById("education").value,
      highSchoolYear: document.getElementById("highSchoolYear").value,
      studyField: document.getElementById("studyField").value,


      familiarity: (() => {
        for (const option of familiarityOptions) {
          if (option.checked) {
            selectedFamiliarity = option.value;
            return selectedFamiliarity;
          }
        }
      })(),

      selectedField: (() => {
        for (const option of selectedFieldOptions) {
          if (option.checked) {
            return option.getAttribute("selectedstr");
          }
        }
      })(),

      refer: (
        ()=>{ 
          if (selectedFamiliarity==='other'){
            return document.getElementById("refer").value;
          } else if (selectedFamiliarity==="موسسات نیکوکاری"){
            return selectedCharityName;
          }

        }
      )(),
      careerPathwayOther: document.getElementById("careerPathwayOther").value,
      careerPathwayId: (() => {
        for (const option of selectedFieldOptions) {
          if (option.checked) {
            return option.value;
          }
        }
      })(),
      description: document.getElementById("description").value,
      uniSemester: document.getElementById("uniSemester").value,
      course: "07",
      groupID: "37",
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw);

    fetch("https://kaaryar.hossein.codes/reg/wp/new", requestOptions)
      .then(response => {
        if (response.status === 409) {
          throw new Error(".فرم شما ثبت نشد. لطفا از اینکه ایمیل و تلفن وارد شده تکراری نیست مطمئن شوید");
        } else if (response.ok) {
          // Successful response handling
          alert('فرم شما با موفقیت ثبت شد');
          window.location.href = "https://kaaryar.ir/";

        } else {
          // Other response handling
          alert(".اطلاعات شما ثبت نشد. لطفا مجددا تلاش کنید و درصورت تکرار با پشتیبانی تماس بگیرید")
        }
        return response.text();
      })
      .then(result => {

        console.log(result);

      })
      .catch(error => {
        console.error('Error:', error);
        alert('خطا در ثبت اطلاعات: ' + '\n' + error.message + "\n" + "لطفا مجددا تلاش کنید و درصورت تکرار با پشتیبانی تماس بگیرید");
      });




  }
});


const provinceOptions = [
  { value: "آذربایجان شرقی", label: "آذربایجان شرقی" },
  { value: "آذربایجان غربی", label: "آذربایجان غربی" },
  { value: "اردبیل", label: "اردبیل" },
  { value: "اصفهان", label: "اصفهان" },
  { value: "البرز", label: "البرز" },
  { value: "ایلام", label: "ایلام" },
  { value: "بوشهر", label: "بوشهر" },
  { value: "تهران", label: "تهران" },
  { value: "چهارمحال و بختیاری", label: "چهارمحال و بختیاری" },
  { value: "خراسان جنوبی", label: "خراسان جنوبی" },
  { value: "خراسان رضوی", label: "خراسان رضوی" },
  { value: "خراسان شمالی", label: "خراسان شمالی" },
  { value: "خوزستان", label: "خوزستان" },
  { value: "زنجان", label: "زنجان" },
  { value: "سمنان", label: "سمنان" },
  { value: "سیستان و بلوچستان", label: "سیستان و بلوچستان" },
  { value: "فارس", label: "فارس" },
  { value: "قزوین", label: "قزوین" },
  { value: "قم", label: "قم" },
  { value: "کردستان", label: "کردستان" },
  { value: "کرمان", label: "کرمان" },
  { value: "کرمانشاه", label: "کرمانشاه" },
  { value: "کهگیلویه و بویراحمد", label: "کهگیلویه و بویراحمد" },
  { value: "گلستان", label: "گلستان" },
  { value: "گیلان", label: "گیلان" },
  { value: "لرستان", label: "لرستان" },
  { value: "مازندران", label: "مازندران" },
  { value: "مرکزی", label: "مرکزی" },
  { value: "هرمزگان", label: "هرمزگان" },
  { value: "همدان", label: "همدان" },
  { value: "یزد", label: "یزد" },
];

// API for CareerPathWay

async function careerPathwayItems() {
  try {

    const response = await fetch('https://kaaryar.hossein.codes/reg/wp/careerpathways/values/all', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    const items = await response.json();
    return items;
  } catch (error) {
  }
}

async function charityNameOptions() {
  try {
    const response = await fetch('https://kaaryar.hossein.codes/reg/wp/charity-orgs/values/all', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    const items = await response.json();
    return items;

  } catch (error) {
    console.log(error);
  }
}

async function populateCharityNameOptions(selectId) {
  const charityNameOptionClassName = 'charity-name-option';
  const charityNameList = await charityNameOptions();
  const charitySelectTag = document.getElementById(selectId);
  charityNameList.forEach(
    item => {
      const option = document.createElement('option');
      option.innerText = `${item.value}`;
      option.classList.add(charityNameOptionClassName);
      charitySelectTag.appendChild(option);
    }
  );

  charitySelectTag.addEventListener('change',
  ()=>{
    selectedCharityName = charitySelectTag.value;
  }
  );

}

async function populateCareerPathways(divId) {
  const careerPathwayList = await careerPathwayItems();
  const careerPathWayOptions = document.getElementById(divId);
  careerPathWayOptions.innerHTML = "";
  careerPathwayList.forEach(item => {
    const option = document.createElement('div');
    option.innerHTML = `
    <div class="front-end-course">
      <input id="pathway${item.id}" class="selected-field-option" type="radio" name="selectedField"
        value=${item.id} selectedstr="${item.name}">
        <label for="pathway${item.id}">${item.name}</label>
    </div>
    `;
    careerPathWayOptions.appendChild(option);

  });
  selectedFieldOptions = document.querySelectorAll('.selected-field-option');

  selectedFieldOptions.forEach(option => {
    option.addEventListener('click', () => {
      selectedFieldValue = option.getAttribute("selectedstr");
      if (selectedFieldValue == "other") {
        showInput(careerPathwayOtherField);

      } else if (careerPathwayOtherField?.style.display == "block") {
        hideInput(careerPathwayOtherField);
      }
      hideBorder(selectedField);
    });

  });

}
