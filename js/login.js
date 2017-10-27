// ******************************************* LOGIN PAGE JS ******************************************* //

// Get page elements
var dataFields = [].slice.call(document.querySelectorAll('.js-data-field'));
var submitBtn = document.getElementById("submit");

// add event listener to input fields
dataFields.forEach(function(btn){
	// validate input on blur
	btn.addEventListener("blur", function(){
		validateSingleField(btn, btn.name, btn.value);
	});
	// remove animtaion on animtaionend
	btn.addEventListener("animationend", function(){
		btn.classList.remove("-shake_me");
	});
});

// validate single field function
var validateSingleField = function(el, name, value) {
	switch (name) {
		case "website":
			return validateWebsite(value);
			break;
		case "username":
			return validateUser(el, value);
			break;
		case "password":
			return validatePwd(el, value);
			break;
		default:
			console.log("These aren't the Droids you're looking for...");
	}
}

// Check honeypot to redirect autobot
var validateWebsite = function(value) {
	if(value) {
		// disable submit
		submitBtn.disabled = true;
		return false;
	} else {
		return true;
	}
}

// Check username
var validateUser = function(el, value) {
	// get error msg element
	var errMsg = el.nextElementSibling;
	// set only letters
	var chars = /^[a-zA-Z]*$/;
	// check if empty
	if(!value.trim()){
		errMsg.innerHTML = "Username required!";
		errMsg.classList.remove("is-visuallyhidden");
		el.classList.add("-error", "-shake_me");
		return false;
	} else {
		// check if only letters
		if(!chars.test(value)) {
			errMsg.innerHTML = "Username not found!";
			errMsg.classList.remove("is-visuallyhidden");
			el.classList.add("-error", "-shake_me");
			return false;
		} else {
			errMsg.innerHTML = "";
			errMsg.classList.add("is-visuallyhidden");
			el.classList.remove("-error");
			return true;
		}
	}
}

// Check pass
var validatePwd = function(el, value) {
	// get error msg element
	var errMsg = el.nextElementSibling;
	// check if empty
	if(!value.trim()){
		errMsg.innerHTML = "Password required!";
		errMsg.classList.remove("is-visuallyhidden");
		el.classList.add("-error", "-shake_me");
		return false;
	} else {
		errMsg.innerHTML = "";
		errMsg.classList.add("is-visuallyhidden");
		el.classList.remove("-error");
		return true;
	}
}

// Check form on submit
submitBtn.addEventListener("click", function(){
	// Set user data array
	var data = {};
	// Check if fields valid
	var result = dataFields.every(function(btn){
		if(validateSingleField(btn, btn.name, btn.value)) {
			data[btn.name] = btn.value;
			return true;
		} else {
			return false;
		}
	});

	if(result){
		data["submit"] = this.value;
		alert("Login successful!");
	}
});