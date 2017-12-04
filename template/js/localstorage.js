/*Funcoes CRUD para localStorage*/

/*readLocal - recebe um inteiro de 0 a 2 e retorna um objeto*/
/*0 = clientes, 1 = profissionais, 2 = login*/
function readLocal (table){
	setLocal();
	if (table == 0){
		return JSON.parse(localStorage.clientes);
	}
	else if (table == 1){
		return JSON.parse(localStorage.profissionais);
	}
	else if (table == 2){
		return JSON.parse(localStorage.login);
	}
}

/*CreateLocal - regrava os dados em localstorage. Recebe um array de objetos*/
/*0 = clientes, 1 = profissionais, 2 = login, 3 = pontos gps*/
function createLocal(table){
	setLocal();
	console.log("table");
	console.log(table);
	if (Array.isArray(table)) {
		if (table[0].tipo == 0) {
			localStorage.clientes = JSON.stringify(table);
		}
		else if (table[0].tipo == 1) {
			localStorage.profissionais = JSON.stringify(table);
		}
		
	}
	else if (table.tipo == 2) {
		localStorage.login = JSON.stringify(table);
	}
	else if (table.tipo == 3) {
		localStorage.pontos = JSON.stringify(table);
	}
}

function updateLocal(obj) {
	var table;
	if (obj.tipo == 0) {
		table = readLocal(0);
	}
	else if (obj.tipo == 1) {
		table = readLocal(0);
	}

	table[obj.id] = obj;

	createLocal(table);	
}


/*Inicializa as tabelas em localStorage se elas não estiveram sido inicializadas*/
/*0 = clientes, 1 = profissionais, 2 = login*/
function setLocal () {
	if (localStorage.clientes == undefined){
		localStorage.setItem("clientes", JSON.stringify([]));
	}
	if (localStorage.profissionais == undefined){
		localStorage.setItem("profissionais", JSON.stringify([]));
	}
	if (localStorage.login == undefined){
		localStorage.setItem("login", JSON.stringify(""));
	}
	if (localStorage.pontos == undefined){
		localStorage.setItem("pontos", JSON.stringify(""));
	}
}

/*Deleta login do localstorage */
function deleteLogin () {
	localStorage.removeItem("login");
}

