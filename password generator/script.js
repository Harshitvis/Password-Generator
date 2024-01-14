const inputslider = document.querySelector("[data-lengthSlider]");
const lengthDisplay  = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[ data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck= document.querySelector("#lowercase");
const numbercheck = document.querySelector("#numbers");
const symbolcheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn  = document.querySelector(".Generate-button");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*()_-+={[}]:;"<,>.?/';
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");
function handleSlider(){
    inputslider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputslider.min;
    const max = inputslider.max;
    inputslider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%"

} 
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}


function generateSymbol(){

    const randNum = getRndInteger(0,symbols.length);

    return symbols.charAt(randNum);
    
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;
    if(uppercasecheck.checked) hasUpper = true;
    if(lowercasecheck.checked) hasLower = true;
    if(numbercheck.checked) hasNum = true;
    if(symbolcheck.checked) hasSym = true;
    if(hasUpper && hasLower && (hasNum || hasSym)&& passwordLength>=8){
        setIndicator("#0f0");

    }
    else if(
        (hasLower || hasUpper)&&
        (hasNum || hasSym) &&
        passwordLength>=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}
function shuffle(array){
for(let i = array.length - 1;i>0;i--){
    const j = Math.floor(Math.random()*(i*i));
    const temp = array[i];
    array[i] = array[j];
    array[j]  = temp;
}
let str = "";
array.forEach((el) => (str+=el));
return str;

}

 function handleCheckBoxChange(){
    checkCount = 0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
 }
 allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
 })
 
 inputslider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
 })

 copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
    copyContent();
 })
 generateBtn.addEventListener('click', ()=>{
        
    if(checkCount == 0) 

    return;
    
         if(passwordLength<checkCount){
            passwordLength = checkCount;
            handleSlider();
         }
         password = "";

        //  if(uppercasecheck.checked){
        //     password+=generateUpperCase();
        //  }
        //  if(lowercasecheck.checked){
        //     password+=generateLowerCase();
        //  }
        //  if(numbercheck.checked){
        //     password+=generateRandomNumber();
        //  }
        //  if(symbolcheck.checked){
        //     password+=generateSymbol();
        //  }

        let funarr = [];
        if(uppercasecheck.checked){
            funarr.push(generateUpperCase);
        }
        if(lowercasecheck.checked){
            funarr.push(generateLowerCase);
        }
        if(numbercheck.checked){
            funarr.push(generateRandomNumber);
        }
        if(symbolcheck.checked){
            funarr.push(generateSymbol);
        }

        for(let i=0;i<funarr.length;i++){
            password+= funarr[i]();
        }
         
        for(let i=0;i<passwordLength - funarr.length; i++){
            let randIndex = getRndInteger(0,funarr.length);
            password+= funarr[randIndex]();
        }
        password = shuffle(Array.from(password));

        passwordDisplay.value = password;

        calcStrength();

 });