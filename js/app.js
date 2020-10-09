// Information about players. Array with example data 
let players = [
	["43127678F", "Juan", "Pérez Gómez", "692403829", "jperez@gmail.com", "12/12/1980", "ES6621000418401234567891", "PRO"],
	["43125043G", "Adolfo", "Gutiérrez Lorma", "692403829", "agutierrez@gmail.com", "12/12/1985", "ES6000491500051234567892", "PRO"],
	["43125430I", "Carles", "Vich Sacelo", "692403829", "cvich@gmail.com", "12/12/1981", "ES9420805801101234567891", "PRO"],
	["43124345J", "Gustavo", "Cander More", "692403829", "gmore@gmail.com", "12/12/1995", "ES9000246912501234567891", "PRO"],
	["43127678F", "Alicia", "Pérez Gómez", "692403829", "jperez@gmail.com", "12/12/1980", "ES6621000418401234567891", "BEG"],
	["43125043G", "David", "Gutiérrez Lorma", "692403829", "agutierrez@gmail.com", "12/12/1985", "ES6000491500051234567892", "BEG"],
	["43125430I", "Patricia", "Vich Lorem", "692403829", "cvich@gmail.com", "12/12/1981", "ES9420805801101234567891", "BEG"],
	["43124345J", "Pepa", "Vivancos Leia", "692403829", "pleia@gmail.com", "12/12/1995", "ES9000246912501234567891", "BEG"]
];

// Containers and global objects 
const containerPlayersBeg = document.getElementById('c_beginner_list');
const containerPlayersPro = document.getElementById('c_professional_list');
const buttonAdd = document.getElementById('btn-enviar');

init();

//TODO
// Main function. 
function init() {
	populateListPlayers();
}

//TODO
// This function adds a new player on the list
/******************************************************************************/
function addPlayer() {
	let info = []
	const formdata = document.forms["frmPlayer"].getElementsByTagName("input")
	const tipe = document.getElementById("category").value
	//const tipe = document.forms["frmPlayer"].getElementsByTagName("select")[0].value
	for (let data of formdata) {
		info.push(data.value)
	}
	info.push(tipe)
	if ((validateForm(info)) && (isValidAgePlayer(info[3], info[7]))) {
		players.push(info);
		document.getElementById("frmPlayer").reset();
		populateListPlayers();
	}
}

//TODO
// Checks data from the form fields
function validateForm(info) {
	if (info[0] == "") {
		alert("El camp DNI esta buit")
		return false
	} else if (info[1] == "") {
		alert("El camp Nom esta buit")
		return false
	} else if (info[2] == "") {
		alert("El camp Llinatges esta buit")
		return false
	} else if (info[3] == "") {
		alert("El camp Data de naixement esta buit")
		return false
	} else if (info[4] == "") {
		alert("El camp Telèfon esta buit")
		return false
	} else if (info[5] == "") {
		alert("El camp Email esta buit")
		return false
	} else if (info[6] == "") {
		alert("El camp Compte corrent esta buit")
		return false
	} else if (validateDNI(info[0])) {
		if (validateDate(info[3])) {
			if (validatePhone(info[4])) {
				if (validateEmail(info[5])) {
					return true
				} else { alert("Has de posar un email valid") }
			} else { alert("Has de posar un telèfon valid") }
		} else { alert("Has de posar una data valida") }
	} else { alert("Has de posar un DNI valid") }
}
//No pongo el validateAccount porque no sabria como poner una cuenta válida, pero lo haria de la misma forma que las demás.

//TODO
// Create two separate lists depens on category. it uses two different containers
function populateListPlayers() {
	containerPlayersPro.innerHTML = ""
	containerPlayersBeg.innerHTML = ""
	for (let i = 0; i < players.length; i++) {
		if (players[i][7] === "PRO") {
			containerPlayersPro.innerHTML += `<p class="playerData"> 
			<span class="player-col">${players[i][1]} ${players[i][2]}</span>
			<span class="player-col">${players[i][4]}</span>
			<span class="player-col">${players[i][7]}</span>
			</p>`
		} else {
			containerPlayersBeg.innerHTML += `<p class="playerData"> 
			<span class="player-col">${players[i][1]} ${players[i][2]}</span>
			<span class="player-col">${players[i][4]}</span>
			<span class="player-col">${players[i][7]}</span>
			</p>`
		}
	}
}

//TODO
// This function returns true whether the player is 16 years old (for beginners) or 18 years old (for professionals)
function isValidAgePlayer(sDate, minAge) {
	let today = new Date()
	let birthday = new Date(sDate)
	let year = today.getFullYear() - birthday.getFullYear();
	let month = today.getMonth() - birthday.getMonth();

	//Sinceramente esta parte no entiendo muy bien que hace, la he buscado por internet porque no sabia hacerlo y funciona.
	if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
		year--;
	}
	if (minAge === "PRO") {
		if (year >= 18) {
			return true
		}
		alert("Necesitas tener 18 años para Profesional")
	}
	else if (minAge === "BEG") {
		if (year >= 16) {
			return true
		}
		alert("Necesitas tener 16 años para Beginner")
	}
}