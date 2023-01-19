(function () {
	var RESULTS = {};
	RESULTS[0] = {
		name: "0% - 9% = Normal",
		text:
		"Whelp, you're not a nerd. Case closed. You're a normal person who likes<br>normal things, and that's cool.",
	};
	RESULTS[40] = {
		name: "10% - 19% = Well-cultured",
		text:
		"You have some nerdy tendencies, but you're still pretty normal. However, your<br>score could easily swing into 'nerd territory.'",
	};
	RESULTS[80] = {
		name: "20% - 29% = Low-key nerd",
		text:
		"You were definitely into many intellectual pursuits, but that never seemed<br>to impact your social life. You spent good time with both the nerds and the<br>'cooler' kids, and were well-known around the school.",
	};
	RESULTS[120] = {
		name: "30% - 39%  = Honors student",
		text:
		"You were the kid who saw nothing lower than an 'A' and who always made the<br>honor roll. When others were panicking and trying to raise their D to a C, you<br>had nothing to worry about.",
	};
	RESULTS[160] = {
		name: "40% - 49%  = Sci-Fi Addict",
		text:
		"Star Trek > Sleep... or at least that's how it is in your mind. You've read so<br>many books and seen so many movies that Douglas Adams, Isaac Asimov, and Kubrick<br>practically live with you.",
	};
	RESULTS[200] = {
		name: "50% - 59% = Experienced convention-goer",
		text:
		"You're everywhere. All the guys down at the Hamfest know you on a first name<br>basis, and you've lost count of how many ComicCons you've attended.",
	};
	RESULTS[240] = {
		name: "60% - 69% = Dungeon Master",
		text:
		"Roll a d20 for nerdiness... you rolled a nat 20! That's right, you're the<br>dungeon master of your guild. After all, what's cooler than a binder covered in D&D stickers?",
	};
	RESULTS[380] = {
		name: "70% - 79% = Poindexter",
		text:
		"When you watched 'Revenge of the Nerds', you couldn't help but relate.<br>Hell, you're practically every stereotypical nerd combined.",
	};
	RESULTS[320] = {
		name: "80% - 89% = 'Human Microchip",
		text:
		"You have transcended beyond the mortal plane of existence. Other nerds are<br>nothing compared you. Your complete devotion to academics and your mannerisms are<br>enough to turn almost anyone away from you.",
	};
	RESULTS[360] = {
		name: "90% - 100% = Nerd God",
		text:
		"FEAR MY POWER, MERE MORTALS! I SHALL RISE UP AND DESTROY YOU WITH MY REVERSE<br>POLISH NOTATION CALCULATOR!",
	};
	/*************************************************************************
	If for some reason you need to give your form a different name attribute
	than "quizform", enter it here. Otherwise, leave this alone.
	*************************************************************************/
	var FORM_NAME = "quizform";
	/*************************************************************************
	DO NOT EDIT ANYTHING BELOW THIS POINT
	*************************************************************************/
	var form = document.forms[FORM_NAME];
	var form_elements = document.forms[FORM_NAME].elements;
	var form_element;
	var result_div = document.getElementById("result_div");
	var result_image = document.getElementById("result_image");
	var result_text = document.getElementById("result_text");
	var result_bbcode = document.getElementById("result_bbcode");
	var result_html = document.getElementById("result_html");
	var min_score = 0;
	var min_scores = {};
	var error = false;
	// Validate the quiz form to prevent common issues
	for (var i = 0; i < form_elements.length; i++) {
		form_element = form_elements[i];
		if (form_element.type === "radio" || form_element.type === "checkbox") {
			if (isNaN(form_element.value)) {
				alert(
					"You have an answer on your quiz with a non-numerical value (" +
						form_element.value +
						"). You probably made a typo."
				);
			} else {
				if (form_element.name in min_scores) {
					if (form_element.value * 1 < min_scores[form_element.name]) {
						min_scores[form_element.name] = form_element.value * 1;
					}
				} else {
					min_scores[form_element.name] = form_element.value * 1;
				}
			}
		}
	}
	for (var q in min_scores) {
		min_score += min_scores[q];
	}
	error = true;
	for (var score in RESULTS) {
		if (score <= min_score) {
			error = false;
			break;
		}
	}
	if (error) {
		alert(
			"The lowest score it is possible to get on your quiz is lower than the minimum score you have defined a result for. You've probably made a mistake somewhere."
		);
	}
	form.onsubmit = function () {
		var score = 0;
		var result_scores = [];
		var result;
		var form_element;
		var i;
		for (i = 0; i < form_elements.length; i++) {
			form_element = form_elements[i];
			if (
				(form_element.type === "radio" || form_element.type === "checkbox") &&
				form_element.checked
			) {
				score += form_element.value * 1;
			}
		}
		document.getElementById("demo").innerHTML = score;
		for (var min_score in RESULTS) {
			result_scores.push(min_score * 1);
		}
		result_scores.sort(function (a, b) {
			return a - b;
		});
		for (i = 0; i < result_scores.length; i++) {
			if (result_scores[i] <= score) {
				result = RESULTS[result_scores[i]];
			}
		}
		/*if (result.link) {
			window.location = result.link;
			return false;
		}
		if (result_image) {
			result_image.src = RESULTS_FOLDER_URL + result.image;
			result_image.setAttribute("alt", result.name);
			if (result.text) result_image.title = result.text;
		}
		if (result_text && result.text) {
			result_text.innerHTML = result.text;
		}
		if (result_bbcode) {
			result_bbcode.innerHTML =
				"[url=" +
				QUIZ_URL +
				"][img]" +
				RESULTS_FOLDER_URL +
				result.image +
				"[/img][/url]";
		}
		if (result_html) {
			result_html.innerHTML =
				'<a href="' +
				QUIZ_URL +
				'"><img src="' +
				RESULTS_FOLDER_URL +
				result.image +
				'" alt="' +
				result.name +
				'" title="' +
				result.text +
				'"></a>';
		}*/
		result_div.style.display = "block";
		return false;
	};
})();
/*************************************************************************
Free quiz script from The Cave of Dragonflies:
http://www.dragonflycave.com/free-quiz-scripts
*************************************************************************/
