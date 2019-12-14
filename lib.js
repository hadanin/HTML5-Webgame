var nutritionSource = ["Iron", "D", "B12", "Calcium"];
var nutritionBar = {
	broccoli: ["Iron"],
	cereal: ["D"],
	egg: ["B12", "D"],
	milk: ["D", "Calcium"],
	salmon: ["B12"],
	spinach: ["Iron"]
};
var plateLimit = 3;
var askedNutritionLimit = 2;
var plateItems = [];
var plateNutrition = [];
var nutritionAsked = [];

function checkFood() {
	plateNutritionChecking = [].concat.apply([], plateNutrition);
	let checker = (arr, target) => target.every(v => arr.includes(v));
	if (checker(plateNutritionChecking, nutritionAsked)) {
		messageBar("Bon Appetite!", 1);
	} else {
		messageBar("Not Enough Vitamins and Minerals!", 3);
	}
}

function askNutrition() {
	shuffle(nutritionSource);
	nutritionAsked = nutritionSource.slice(0, askedNutritionLimit);
	quesion =
		"Make a food supplies listed vitamins and minerals: " +
		nutritionAsked.toString();
	document.getElementById("nutrition_needed").innerHTML = quesion;
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	if (document.getElementById("message-bar").className.indexOf("alert") > -1)
		messageBar("", 0);
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, add = true) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	if (add) {
		if (plateItems.length < plateLimit) {
			plateItems.push(data);
			updateVitamins(data, true);
			document
				.getElementById("div1")
				.appendChild(document.getElementById(data));
		} else {
			messageBar("Plate has no more room, how about your tummy?", 2);
		}
	} else {
		index = plateItems.indexOf(data);
		if (index > -1) {
			plateItems.splice(index, 1);
			updateVitamins(data, false);
			document
				.getElementById("chefTable")
				.appendChild(document.getElementById(data));
		}
	}
}
function updateVitamins(id, added = true) {
	if (added) {
		plateNutrition = [...plateNutrition, ...[nutritionBar[id]]] /* .unique() */;
	} else {
		for (var i = 0; i < plateNutrition.length; i++) {
			if (
				JSON.stringify(plateNutrition[i]) == JSON.stringify(nutritionBar[id])
			) {
				plateNutrition.splice(i, 1);
				break;
			}
		}
	}
}
Array.prototype.unique = function() {
	var a = this.concat();
	for (var i = 0; i < a.length; ++i) {
		for (var j = i + 1; j < a.length; ++j) {
			if (a[i] === a[j]) a.splice(j--, 1);
		}
	}

	return a;
};
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
/*
type: 	1 = success
		2 = warning
		3 = error
*/
function messageBar(msg, type = 1) {
	class_name = "";
	switch (type) {
		case 0:
			class_name = "";
			break;
		case 1:
			class_name = "alert alert-success";
			break;
		case 2:
			class_name = "alert alert-warning";
			break;
		case 3:
			class_name = "alert alert-danger";
			break;
	}
	document.getElementById("message-bar").innerHTML = msg;
	document.getElementById("message-bar").setAttribute("class", class_name);
}
