const BASE_URL = 'http://localhost:3000/';
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
	console.log(lang)
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
	        console.log(text);
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
	document.getElementById("correct").style.display = "block";
}

function reset() {
	document.getElementById("correct").style.display = "none";
	document.getElementById("check").style.display = "block";
	document.getElementById("result-c").style.display = "none";
	document.getElementById("text-c").style.display = "flex";
	document.getElementById("textarea").value = text;
}


const dummyText = [
	{ text: 'Hello', correct: true},
	{ text: 'my', correct: true},
	{ text: 'nmea', correct: false},
	{ text: 'is', correct: true},
	{ text: 'John', correct: false}
]

function setHeight() {
	const elem = document.querySelector("#textarea");
	if(elem) {
	  	const rect = elem.getBoundingClientRect();
		document.getElementById('ex-pa').style.height = rect.height + 'px';
	}
	// let h = document.getElementById('result').style.height;
	
	// console.log(h)
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