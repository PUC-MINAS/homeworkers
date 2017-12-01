/*Variáveis Globais*/
var HTTPReq = new XMLHttpRequest();

/*---------------------------------------------*/




/*Grava dados em local storage*/
/*newObj é um objeto com estrutura completa*/
/*newObj.tipo é um inteiro que define a tabela. Clientes = 0, profissionais = 1, login = 2*/
function gravarLocal(newObj) {
	alert("gravarLocal");
	var table;
	if (newObj.tipo == 0 || newObj.tipo == 1 ) {
		table = readLocal(newObj.tipo);
		newObj.id = table.length;
		table[table.length] = newObj;
	}
	if (newObj.tipo == 2){
		table = newObj;
	}
	console.log(table);
	createLocal(table);
}


/*Pesquisa por profissionais em local storage*/
function pesquisarProfissionais(sprof){
	var table = readLocal(1);
	var b= [];
	var str;

	for (var i = 0; i < table.length; i++) {
		str = table[i].profissao + " " + table[i].endereco + " " + table[i].num_endereco + " " +
			  table[i].bairro + " " + table[i].cidade + " " + table[i].uf;
		str = str.toLowerCase();
		if ( str.search(sprof.profissao) != -1 && str.search(sprof.regiao) != -1 ) {
 			b.push(table[i]);
  		}
	}
	if (b.length > 0) {
		document.getElementById("error-pesquisa").style.display = 'none';
	}
	else {
		document.getElementById("error-pesquisa").style.display = 'block';
	}
	imprimePesquisaProfissionais(b);
	/*plotaMaps(b);*/
}

function plotaMaps(table) {

}

/*Ler parametros da query da URL*/
function lerParametro () {
	var params = new URLSearchParams(document.location.search.substring(1));
	var prof = params.get("prof"); 
	if (prof == null) {
		document.getElementById("prof").value = "";
	}
	else {
		document.getElementById("prof").value = prof;
	}
	
	lerFiltro();
}


/*Ler campo de filtro da página de pesquisa e chama a funcao pesquisarProfissionais*/
function lerFiltro () {
	var c = {};
	c.profissao = document.getElementById("prof").value;
	c.profissao = c.profissao.toLowerCase();
	c.regiao = document.getElementById("regiao").value;
	c.regiao = c.regiao.toLowerCase();

	pesquisarProfissionais(c);
}


/*Pesquisa por profissionais em local storage ---- inativa*/
/*function pesquisarProfissionais(sprof){
	var table = JSON.parse(localStorage.profissionais);
	var b= [];
	for (var i = 0; i < table.length; i++) {
		if (table[i].profissao == sprof.profissao) {
  			b.push(table[i]);
  		}
	}
	if (b.length > 0) {
		document.getElementById("error-pesquisa").style.display = 'none';
	}
	else {
		document.getElementById("error-pesquisa").style.display = 'block';
	}
	imprimePesquisaProfissionais(b);
}*/




/*Imprime na tela de pesquisa dados do profissional*/
function imprimePesquisaProfissionais(userObj) {
	var txt = "";
	for (var i=0; i<userObj.length; i++) {
		txt += "<a href='perfil.html?perfil=" + userObj[i].id + "' class='a-noformat' ><div class='div-lista'><img src='' alt=''><br>Nome: <span id='nome' >"+
				userObj[i].nome+"</span> <span id='sobrenome'>"+
				userObj[i].sobrenome+"</span><br>Profissão: <span id='prof'>"+
				userObj[i].profissao+"</span><br>Pontuação: <span id='pontuacao'>"+
				userObj[i].pontuacao+"</span><br>Endereço: <span id='endereco'>"+
				userObj[i].endereco+"</span>, <span id='num_endereco'>"+
				userObj[i].num_endereco+"</span>, <span id='bairro'>"+
				userObj[i].bairro+"</span>, <span id='cidade'>"+
				userObj[i].cidade+"</span> - <span id='uf'>"+
				userObj[i].uf+"</span><br>Telefone: <span id='telefone'>"+
				userObj[i].telefone+"</span><br>E-mail: <span id='email'>"+
				userObj[i].email+"</span></div></a>";
	}
	
	document.getElementById("p-pesq").innerHTML = txt;
}

/*Funcao para logar no site*/
function entrar () {
	var logObj = {
					email: "",
					senha: "",
					tipo: 2
				};
	logObj.email = document.getElementById("email").value;
	logObj.senha = document.getElementById("senha").value;

	var obj = pesquisarLocal(logObj);
			
	if (obj != null) {
		if (obj.email == logObj.email && obj.senha == logObj.senha){
			alert("Seja bem vindo " + obj.nome);
			deleteLogin();
			setLogin(logObj);
			window.location.assign("perfil.html");
		}
		else {
					
			deleteLogin();
			alert("Usuário ou senha incorreta");
		}
	}
	else{
			
		deleteLogin();
		alert("Usuário ou senha incorreta");
	}			
}

function sair () {
	deleteLogin();
	alert("Volte Sempre!");
	window.location.assign("index.html");
}

function setLogin (login) {
	alert("setLogin");
	console.log(login);
	gravarLocal(login);
	window.location.assign("perfil.html");
}

function deleteLogin () {
	localStorage.removeItem("login");
}

function checkLogin () {
	var log = readLocal(2);
	var login = pesquisarLocal(log);
	if (log.email == login.email && log.senha == login.senha) {
		return true;
	}
	else {
		return false;
	}
}

function lerParametroPerfil () {
	console.log("Entou em lerParametroPerfil");
	var params = new URLSearchParams(document.location.search.substring(1));
	var perfil = params.get("perfil"); 
	console.log("perfil=", perfil);
	return perfil;
}

function perfil() {
	console.log("entrou funcao perfil");
	var perfil_id = lerParametroPerfil();
	console.log("perfil_id = ", perfil_id);
	var table = readLocal(1);
	console.log(table);
	var obj;
	if (perfil_id == null) {
		MeuPerfil();
	}
	else {
		for (var i= 0; i < table.length; i++) {
			if (perfil_id == table[i].id) {
				obj = table[i];
				console.log ("obj=", obj);
			}
		}
		if (obj == undefined) {
			window.location.assign("index.html");
		}
		else {
			imprimePerfil(obj);
		}
	}
	

}

/*Habilita funcoes de perfil*/
function MeuPerfil () {
	var login = readLocal(2);
	var table, elementos;
	if (login != undefined){
		table = readLocal(0);
		table = table.concat(readLocal(1));
		var obj;
		for (var i=0; i<table.length; i++) {
			if (login.email == table[i].email) {
				obj = table[i];
			}
		}
		if (obj.tipo == 0) {
			elementos = document.getElementsByClassName("p-prof");
			for(var i=0; i<elementos.length; i++){
				elementos[i].style.display = "none";
			}
		}
		elementos = document.getElementsByClassName("perfil-on");
		for(var i=0; i<elementos.length; i++){
			elementos[i].style.display = "";
		}
		imprimePerfil(obj);
	}
	else {
		window.location.assign("index.html");
	}
}

/*Preenche tela de perfil com os dados enviados pelo argumento*/
function imprimePerfil (userObj) {
	console.log("Entrou na funcao pra imprimirir")
	document.getElementById("name-user").innerHTML = userObj.nome + " " + userObj.sobrenome;
	document.getElementById("avaliacao").innerHTML = "N/A";
	document.getElementById("contratacoes").innerHTML = "0";
	document.getElementById("sexo").innerHTML = userObj.sexo;
	document.getElementById("profissao").innerHTML = userObj.profissao;
	document.getElementById("data_nascimento").innerHTML = userObj.data_nascimento;
	document.getElementById("numero_telefone").innerHTML = userObj.telefone;
	document.getElementById("email").innerHTML = userObj.email;
	document.getElementById("endereco").innerHTML = userObj.endereco +" "+ userObj.num_endereco +" "+ userObj.bairro+" "+
	userObj.cidade+" "+ userObj.uf;
	document.getElementById("cep").innerHTML = userObj.cep;
	document.getElementById("img-perfil").src = userObj.perfil;
}


/*Mostra formulário do Cliente*/
function ativaFormClient() {
	//document.getElementById("forms").style.display = "block";
	document.getElementById("form-client").style.display = "block";
	document.getElementById("form-prof").style.display = "none";
	//document.getElementById("div-botoes").style.display = "none";
}

/*Mostra formulário do profissional*/
function ativaFormProf() {
	//document.getElementById("forms").style.display = "block";
	document.getElementById("form-prof").style.display = "block";
	document.getElementById("form-client").style.display = "none";
	//document.getElementById("div-botoes").style.display = "none";
}

/*Valida dados do fomulário de Clientes e chama a funcao gravarLocal(); para gravar os dados do cadastro*/
function validaCadastroClient() {
	var userObj = {
					id: "",
					nome: document.getElementById("cnome").value.replace(/\s/g, ""),
					sobrenome: document.getElementById("csobrenome").value.replace(/\s/g, ""),
					email: document.getElementById("cemail").value,
					senha: document.getElementById("csenha").value,
					sexo: "" ,
					data_nascimento: document.getElementById("cdate").value,
					tipo: 0,
					perfil: ""
					};
				alert("Função validaCadastroClient");
	var msg = '';
	var radio = document.getElementsByName("csexo");
	var confirma_senha = document.getElementById("cconfirm-senha").value;
	var resp= true;
	
	for ( var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			userObj.sexo = radio[i].value;
		}
	}

	if(userObj.nome == ""){
		//document.getElementById("cerror-nome").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo nome obrigatório!\n";
		resp= false;
	}

	if(userObj.sobrenome == ""){
		//document.getElementById("cerror-sobrenome").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo sobrenome obrigatório!\n";
		resp= false;
	}

	if(userObj.data_nascimento == ""){
		//document.getElementById("cerror-data").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo data de nascimento obrigatório!\n";
		resp= false;
	}

	if(userObj.senha != confirma_senha){
		//document.getElementById("cerror-confirmasenha").innerHTML = "<br>Senhas não conferem!";
		msg += "Senhas não conferem!\n";
		resp= false;
	}
	else if (userObj.senha.length < 8) {
		//document.getElementById("cerror-senha").innerHTML = "<br>A senha deve ter no mínimo 8 caracteres!";
		msg += 'A senha deve ter no mínimo 8 caracteres!';
		resp= false;
	}

	

	if (resp) {
		alert("Tudo OK - vai chamar a funcao gravaLocal");
		gravarLocal(userObj);
		var logObj = {
					email: "",
					senha: "",
					tipo: 2
				};
		logObj.email = userObj.email;
		logObj.senha = userObj.senha;
		setLogin(logObj);
		window.location.assign("perfil.html");
	}
	else {
		alert(msg);
	}

	
	return resp;
}

/*Valida dados do fomulário de Profissionais e chama a funcao gravarLocal(); para gravar os dados do cadastro*/
function validaCadastroProf() {
	var userObj = {
					id: "",
					nome: document.getElementById("pnome").value.replace(/\s/g, ""),
					sobrenome: document.getElementById("psobrenome").value.replace(/\s/g, ""),
					email: document.getElementById("pemail").value,
					senha: document.getElementById("psenha").value,
					sexo: "" ,
					data_nascimento: document.getElementById("pdate").value,
					profissao: document.getElementById("prof").value,
					telefone: document.getElementById("ptelefone").value.replace(/\s/g, ""),
					endereco: document.getElementById("pendereco").value,
					num_endereco: document.getElementById("pnumero").value.replace(/\s/g, ""),
					bairro: document.getElementById("pbairro").value,
					cidade: document.getElementById("pcidade").value,
					uf: document.getElementById("puf").value,
					cep: document.getElementById("pcep").value,
					pontuacao: "",
					tipo: 1,
					perfil: "",
					imagens: []
					};
	
	var msg = "";
	alert("Função validaCadastroProf();");
	var radio = document.getElementsByName("psexo");
	var confirma_senha = document.getElementById("pconfirm-senha").value;
	var resp= true;

	for ( var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			userObj.sexo = radio[i].value;
		}
	}

	if(userObj.nome == ""){
		//document.getElementById("perror-nome").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo nome obrigatório!\n";
		resp= false;
	}

	if(userObj.sobrenome == ""){
		//document.getElementById("perror-sobrenome").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo sobrenome obrigatório!\n";
		resp= false;
	}

	if(userObj.data_nascimento == ""){
		//document.getElementById("perror-data").innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo data obrigatório!\n";
		resp= false;
	}

	if (userObj.telefone == "") {
		//document.getElementById('perror-telefone').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo telefone obrigatório!\n";
		resp = false;
	}

	if (userObj.endereco == "") {
		//document.getElementById('perror-endereco').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.num_endereco == "") {
		//document.getElementById('perror-numero').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo número da residencia obrigatório!\n";
		resp = false;
	}

	if (userObj.bairro == "") {
		//document.getElementById('perror-bairro').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo bairro obrigatório!\n";
		resp = false;
	}

	if (userObj.cidade == "") {
		//document.getElementById('perror-cidade').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo cidade obrigatório!\n";
		resp = false;
	}

	if (userObj.estado == "") {
		//document.getElementById('perror-estado').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo estado obrigatório!\n";
		resp = false;
	}

	if (userObj.cep == "") {
		//document.getElementById('perror-cep').innerHTML = "<br>Campo Obrigatório!";
		msg += "Campo CEP obrigatório!\n";
		resp = false;
	}

	if(userObj.senha != confirma_senha){
		//document.getElementById("perror-confirmasenha").innerHTML = "<br>Senhas não conferem!";
		msg += "Senhas não conferem\n";
		resp= false;
	}
	else if (userObj.senha.length < 8) {
		//document.getElementById("perror-senha").innerHTML = "<br>A senha deve ter no mínimo 8 caracteres!";
		msg += "A senha deve ter no mínimo 8 caracteres!\n";
		resp=false;
	}


	if (resp) {
		gravarLocal(userObj, 1);
	}
	else {
		alert(msg);
	}

	return resp;
}	

/*Funcao para pesquisar CEP e preencher campos de endereço dos formulários automáticamente*/
function pesquisaCep (){
	var cep = document.getElementById('pcep').value;
	var url = 'https://viacep.com.br/ws/'+cep+'/json/';
	
	HTTPReq.onreadystatechange = trataResposta;
	HTTPReq.open('GET', url + '?_view=json','true');
	HTTPReq.send('');	
}

/*trata dados da funcao pesquisaCEP();*/
function trataResposta (id) {
	if (HTTPReq.readyState == 4) {
		var result = JSON.parse (HTTPReq.responseText);
		/*alert(result.cep +'\n'+result.logradouro+'\n'+result.bairro+'\n'+result.localidade+'\n'+result.uf);*/
		document.getElementById('pendereco').value = result.logradouro;
		document.getElementById('pbairro').value = result.bairro;
		document.getElementById('pcidade').value = result.localidade;
		document.getElementById('puf').value = result.uf;
	}
}

function ativaAlteraImg(){
	document.getElementById("fotoperfil").style.display = "block";
	document.getElementById("altera-img").style.display = "none";
}

function alteraImg() {
	var filesSelected = document.getElementById("fotoperfil").files;
	var login = JSON.parse(localStorage.login);
	var table = JSON.parse(localStorage.clientes);
	var obj;
	for (var i=0; i<table.length; i++) {
		if (login.email == table[i].email) {
			obj = table[i];
		}
	}
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        document.getElementById("img-perfil").src = srcData;

        document.getElementById("fotoperfil").style.display = "none";
		document.getElementById("altera-img").style.display = "block";
		obj.perfil = srcData;
		updateLocal (obj);
		alert("Imagem Alterada");

        /*var newImage = document.createElement('img');
        newImage.src = srcData;

        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);*/
      }
      fileReader.readAsDataURL(fileToLoad);
    }
}

function incluirImg () {
	var filesSelected = document.getElementById("incluirfotos").files;
	var login = JSON.parse(localStorage.login);
	var table = JSON.parse(localStorage.profissionais);
	var obj, qImagens;
	for (var i=0; i<table.length; i++) {
		if (login.email == table[i].email) {
			obj = table[i];
		}
	}
	qImagens = obj.imagens.length;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64
        //document.getElementById("img-perfil").src = srcData;

        //document.getElementById("fotoperfil").style.display = "none";
		//document.getElementById("altera-img").style.display = "block";
		obj.imagens[qImagens] = srcData;
		updateLocal(obj);
		alert("Imagem Alterada");
	  }
	  fileReader.readAsDataURL(fileToLoad);
    }
}



/********************************************************************************/
/*funcoes inativas --- Serão deletadas*/
function cadastrar(){
			var userObj = {
							id: "",
							nome: "",
							sobrenome: "",
							tipo: "",
							profissao: "",
							email: "",
							senha: "",
							sexo: "" ,
							data_nascimento: "",
							telefone: "",
							endereco: "",
							num_endereco: "",
							bairro: "",
							cidade: "",
							uf: "",
							cep: "",
							contratacoes: "",
							pontuacao: ""
						};
			var radio1 = document.getElementsByName("tipo");
			var radio2 = document.getElementsByName("sexo");
			userObj.nome = document.getElementById("nome").value;
			userObj.sobrenome = document.getElementById("sobrenome").value;
			userObj.profissao = document.getElementById("prof").value;
			userObj.email = document.getElementById("email").value;
			userObj.senha = document.getElementById("senha").value;
			userObj.data_nascimento = document.getElementById("date").value;
			userObj.telefone = document.getElementById("telefone").value;
			userObj.endereco = document.getElementById("endereco").value;
			userObj.num_endereco = document.getElementById("numero").value;
			userObj.bairro = document.getElementById("bairro").value;
			userObj.cidade = document.getElementById("cidade").value;
			userObj.uf = document.getElementById("uf").value;
			userObj.cep = document.getElementById("cep").value;

			if (userObj.tipo == "cliente"){
				userObj.profissao = "";
			}

			for ( var i = 0; i < radio1.length; i++) {
				if (radio1[i].checked) {
					userObj.tipo = radio1[i].value;
				}
			}
			for ( var i = 0; i < radio2.length; i++) {
				if (radio2[i].checked) {
					userObj.sexo = radio2[i].value;
				}
			}

			gravarLocal(userObj);

			window.location.assign("index.html");

}


/*Pesquisa dados em localstorage --- incompleta*/
/*userObj é um objeto contando email e senha*/
function pesquisarLocal(userObj) {
	var table = JSON.parse(localStorage.clientes);
	table = table.concat(JSON.parse(localStorage.profissionais));

	for (var i=0; i < table.length; i++) {
		if (userObj.email == table[i].email) {
			return table[i];
		}
	}

	return false;	
}