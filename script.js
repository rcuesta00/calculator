function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b) {
	return a*b;
}

function divide (a,b) {
	return a/b;
}

function operation(op,num1,num2) {
    return op(num1,num2);
}

//END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS
//END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS
//END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS END OF OPERATIONS

function eraseNumber(val) {
	if(display.textContent.length == 1 || display.textContent.length == 0) {
		display.textContent = 0;
		var1 = '';
	}
	else {
		display.textContent = display.textContent.slice(0,-1);
	}
	operator = '';	
}


function clearDisplay() {
	display.textContent = "0";
	operator = '';
	var1 = '';
	result = '';
}

function drawToDisplay(val,disLenght) {
	if(disLenght < 16) {

		if( val != 'Backspace') {

			if( Number(val) || val == 0) {
				var1 += val;
				display.textContent = var1;
			}
			if((val == "." || val == 190) && !display.textContent.includes(".")) {
				var1 += val;
				display.textContent = var1;
			}
		}
	}
}


function keyToDisplay(e) {
	// const displayLenght = display.textContent.length;
	const displayLenght = var1.length;
	let keyValue = e.key || e.keyCode;
	if(keyValue == 'Enter') {keyValue = "=";}
	const keyDown = document.querySelector(`div[data-key="${keyValue}"]`);

	if(keyValue == 'Escape' || keyValue == 'Esc' || keyValue == "27") {
		clearDisplay();
	}
	if(keyValue == "Backspace") {
		eraseNumber();
	}
	else {
		if (!keyDown) {return;} //Do nothing for no numbers or symbols not allowed
		keyDown.classList.add('clicked');
	}

	drawToDisplay(keyValue,displayLenght);
	
	if(/(\+|\-|\=|\*|\/)/.test(keyValue)) {
		operate(keyDown,keyValue);
	}
}

function operate(ev,keyValue) {
	if(operator == '') { 		//First time entering the function
		result = var1;
	}

	if(keyValue != '=') {   //Prepare the operator from the event
		operator = keyValue;
		operator = ev.getAttribute('class').split(" ")[1];
		var1 = '';
	}
	
	if(keyValue == '=' && operator != '') {
		operator = window[operator]; //convert to a funcion
		result = operation(operator,Number(result),Number(var1));
		operator = operator.name; //convert to string
	}

	if(var1 != ''){
		if(String(result).length < 17) {display.textContent = result;}
		else {
			display.textContent = String(result.toExponential(10)).substr(0,17);
		}
	}
}

//START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS 
//START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS 
//START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS START MOUSE EVENTS 

function clickToDisplay(e) {
	const displayLenght = display.textContent.length;
	const keyDown = document.querySelector(`div[data-key="${e.srcElement.dataset.key}"]`);
	if(!keyDown) return;	
	keyValue = keyDown.textContent;
	if(keyValue == 'C') {keyValue = "Escape" || "Esc"}
	if(keyValue == "÷") {keyValue = "/";}

	if(keyValue == 'Escape' || keyValue == 'Esc' || keyValue == "27") {
		clearDisplay();
	}
	// if(keyValue == "Backspace") {
	// 	eraseNumber();
	// }
	drawToDisplay(keyValue,displayLenght);
	keyDown.classList.add('clicked');
	
	if(/(\+|\-|\=|\*|\/)/.test(keyValue)) {
		operate(keyDown,keyValue);
	}
}

function removeTrans(e) {
	if (e.propertyName !== 'transform') return;

	// if(!/(\+|\-|\*|\/)/.test(e.target.getAttribute("data-key"))) {	
			e.target.classList.remove('clicked');
		
}

let display = document.querySelector('.display');
let buttons = Array.from(document.querySelectorAll('.key'));

// GLOBAL VARIABLES
let var1 = '';
let result = '';
let operator = '';

document.addEventListener('keydown',keyToDisplay);
buttons.forEach(divButton => divButton.addEventListener('transitionend', removeTrans));
document.addEventListener('click',clickToDisplay);