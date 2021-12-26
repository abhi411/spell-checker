function applySuggestions(currentRef){
let slctedSuggestion = $(currentRef).text()
let wrongWord = $(currentRef).closest("ul.dropdown-menu").siblings("span").text().trim().replace(/\n/g,'')
$(currentRef).closest("ul.dropdown-menu").siblings("span").text(slctedSuggestion)
$(currentRef).closest("ul.dropdown-menu").siblings("span").css({color: "green"})
let regex = new RegExp(wrongWord, 'g');
let updtdTextareaVal = $("#text-c").find("textarea").val().replace(regex, slctedSuggestion)
$("#text-c").find("textarea").val(updtdTextareaVal)
}



$(document).ready(function(){
	$("#ex-pa").dblclick(function(){
	//   alert("The paragraph was double-clicked.d");
	  reset()
	});
  });
const BASE_URL = 'https://correccionortografica.com/';
let result;
document.addEventListener('readystatechange', event => { 
	// document.getElementById("result").style.backgroundColor = '#262626'
	document.getElementById("correct").style.display = "none";
	document.getElementById('text-count').style.color = '#737373'
	document.getElementById('text-count').innerHTML = '10000 characters left'
});

let lang;
let text;
function langChange() {
	lang = document.getElementById("lang").value;
}

function checkText() {
	text = document.getElementById("textarea").value;
	if(text) {
		if(text.toString().length <= 10000) {
			const body = {
	            string: text,
	            lang: lang
	        }
	        postMethod('spellCheck', body);
		}
		else alert('10000 characters only')
    }
    else {
        alert('Please enter any text')
    }
}

async function postMethod(endpoint, body) {
	const response = await axios.post(BASE_URL + endpoint, body);
    console.log(response)
    const correctText = response.data;
    result = correctText;
    setHeight();
	document.getElementById("text-c").style.display = "none";
	document.getElementById("result-c").style.display = "flex";
	document.getElementById("ex-pa").innerHTML = result;
	document.getElementById("check").style.display = "none";
	document.getElementById("correct").style.display = "inline-block";
}

function reset() {
	document.getElementById("correct").style.display = "none";
	document.getElementById("check").style.display = "inline-block";
	document.getElementById("result-c").style.display = "none";
	document.getElementById("text-c").style.display = "flex";
	// document.getElementById("textarea").value = text;
}


function setHeight() {
	const elem = document.querySelector("#textarea");
	if(elem) {
	  	const rect = elem.getBoundingClientRect();
		document.getElementById('ex-pa').style.height = rect.height + 'px';
	}

}


function textcount() {
	let t = document.getElementById('textarea').value
 
	if (t.toString().length <= 10000) {
		let count = (10000 - t.toString().length) + ' characters left'
		document.getElementById('text-count').innerHTML = count 
		document.getElementById('text-count').style.color = '#737373'
	}
	else {
		let count = (t.toString().length - 10000) + ' characters over'
		document.getElementById('text-count').innerHTML = count	
		document.getElementById('text-count').style.color = 'red'
	}
}

