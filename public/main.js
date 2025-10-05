//references for the user interactive elements
const optType = document.getElementsByName("Type");
const optSize = document.getElementsByName("size");
const optIngredients = document.getElementsByName("Ingredients");
const optSmoothieBase = document.getElementsByName("Smoothie Base");
const optMilkshakeExtras = document.getElementsByName("Extras");
const txtCurrentDrink = document.getElementById("CurrentDrink");
const addToOrderbtn = document.getElementById("add");
const txtCurrentorder = document.getElementById("Currentorder");
const txtOrderTotal = document.getElementById("OrderTotal");
const btnSelectIngredients = document.getElementById("select ingredients")
const btnSelectExtra = document.getElementById("select Extra");

//goes through each item and adds event listener to it
optType.forEach(item => item.addEventListener("change", checkType));
optSize.forEach(item => item.addEventListener("change", checkSize));
optIngredients.forEach(item => item.addEventListener("change", checkIngredients));
optMilkshakeExtras.forEach(item => item.addEventListener("change", checkExtras));
optSmoothieBase.forEach(item => item.addEventListener("change",checkSmoothieBase));
addToOrderbtn.addEventListener("click", addToOrder);

//variables
let sizeCost;
let ExtraCost;
let size;
let Type;
let Ingredientsarray;
let extrasarray;
let cost;
let milk;
let SmoothieBase;
let MilkBase
let total;
let alltotal = 0;
let Extracount = 0;

initialise();
//implement event handlers 
function initialise() {
    Type="no type"
    sizeCost = 3.20;
    extraCost = 0;
    SmoothieBase = "Orange Juice";
    MilkshakeBase = "Semi-Skimmed Milk";
    size = "medium";
    Ingredientsarray = [];
    cost = sizeCost + ExtraCost;
}

//function for type of drink to disable certain features
function checkType() {
    if (this.value=="smoothie") { 
         document.getElementById("milkshake fieldset").style.display='none';
         document.getElementById("Extras fieldset").style.display='none';
         document.getElementById("smoothie fieldset").style.display='block';
         Type="smoothie"
    } else {
         document.getElementById("milkshake fieldset").style.display='block';
         document.getElementById("Extras fieldset").style.display='block';
         document.getElementById("smoothie fieldset").style.display='none';
         Type="Milkshake"
         }
    }
    
//function to check size and add to cost
function checkSize() {
    if (this.value == "small") {
        sizeCost = 2.70;
        size = "small";
    } else if (this.value == "medium") {
        sizeCost = 3.20;
        size = "medium";
    } else if (this.value == "large") {
        sizeCost = 3.70;
        size = "large";
    } else {
        sizeCost= 4.50;
        size="Extra large";
    }
    txtCurrentDrink.innerText = `${sizeCost.toFixed(2)}`;
}

function checkIngredients() {
    var form = document.getElementById("Ingredients");
    btnSelectIngredients.addEventListener("click", (e) => {
        e.preventDefault();
        var checkboxes = document.getElementsByName("Ingredients");
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked == true) {
                if (Ingredientsarray.includes(checkboxes[i].value) == false) {
                    Ingredientsarray.push(checkboxes[i].value);
                }
            }
        }
    })
}
function checkExtras() {
    btnSelectExtra.addEventListener("click", (e) => {
        e.preventDefault();
        cost = 0;
        extrasarray = [];
        const checkbox = document.getElementsByName("Extras");
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                Extracount = Extracount + 1;
                extrasarray.push(checkbox[i].value);
            }
        }
    cost = sizeCost + (Extracount * 0.85)
    txtCurrentDrink.innerText = `${cost.toFixed(2)}`;
    })

}
function checkSmoothieBase() {
    if (this.value == "Apple Juice") {
        SmoothieBase = "Apple Juice";
    } else {
        SmoothieBase = "Orange Juice";
    }
}
function addToOrder() {
    if (`${Type}` == "Milkshake") {
        var selectedValue = document.getElementById("Base").value;
        milk = selectedValue;
        txtCurrentorder.innerText += `${Ingredientsarray} ${size} ${Type}, with ${milk}, with ${extrasarray}, will cost £${cost.toFixed(2)}\n`; 
    } else {
        total = sizeCost;
        txtCurrentorder.innerText += `${Ingredientsarray} ${size} ${Type}, with ${SmoothieBase}, will cost £${cost.toFixed(2)}\n`;
    }
    alltotal += total;
    txtOrderTotal.innerText = `${cost.toFixed(2)}`;
}
