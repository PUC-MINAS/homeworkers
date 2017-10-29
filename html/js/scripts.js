var prof="";

function gravarLocal (userObj) {
	userObj.id = localStorage.length;
	var userObjJSON = JSON.stringify(userObj);
	localStorage.setItem( userObj.email , userObjJSON);
	/*alert(JSON.stringify(userObj));*/
}

function pesquisarLocal(userObj) {
	var text = localStorage.getItem(userObj.email);
	obj = JSON.parse(text);
	return obj;
}

function pesquisarProfissionais (sprof) {
	var b = [];
	for(var i =0, a = []; i < localStorage.length; i++){
  		a[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));	
	}
	for (i = 0; i < a.length; i++) {
		if (a[i].tipo == "profissional" && a[i].profissao == sprof) {
  			b.push(a[i]);
  		}
	}
	if (b.length > 0) {
		document.getElementById("error-pesquisa").style.display = 'none';
	}
	imprimePesquisaProfissionais(b);
}

function imprimePesquisaProfissionais(userObj) {
	var txt = "";
	for (var i=0; i<userObj.length; i++) {
		txt += "<div class='div-lista'><img src='' alt=''><br>Nome: <span id='nome' >"+
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
				userObj[i].email+"</span></div>";
	}
	
	document.getElementById("p-pesq").innerHTML = txt;
}


function entrar () {
			var logObj = {
						email: "",
						senha: ""
					};
			logObj.email = document.getElementById("email").value;
			logObj.senha = document.getElementById("senha").value;

			obj = pesquisarLocal(logObj);
			
			if (obj != null) {
				if (obj.email == logObj.email && obj.senha == logObj.senha){
					alert("Seja bem vindo " + obj.nome);
					deleteCookie("email");
					deleteCookie("senha");
					setCookie("email", obj.email, 1);
					setCookie("senha", obj.senha, 1);
					/*setCookie( obj.email , obj.senha, 1);*/
					window.location.assign("index.html");
					/*Criar cookie ou sessão*/
				}
				else {
					
					deleteCookie("email");
					deleteCookie("senha");
					alert("Usuário ou senha incorreta");
				}
			}
			else{
				
				deleteCookie("email");
				deleteCookie("senha");
				alert("Usuário ou senha incorreta");
			}			
		}

function ativaFormClient() {
	document.getElementById("forms").style.display = "block";
	document.getElementById("form-client").style.display = "block";
	document.getElementById("form-prof").style.display = "none";
	//document.getElementById("div-botoes").style.display = "none";
}

function ativaFormProf() {
	document.getElementById("forms").style.display = "block";
	document.getElementById("form-prof").style.display = "block";
	document.getElementById("form-client").style.display = "none";
	//document.getElementById("div-botoes").style.display = "none";
}

function validaCadastroClient() {
	var userObj = {
					id: "",
					nome: document.getElementById("cnome").value,
					sobrenome: document.getElementById("csobrenome").value,
					email: document.getElementById("cemail").value,
					senha: document.getElementById("csenha").value,
					sexo: "" ,
					data_nascimento: document.getElementById("cdate").value
					};

	var radio = document.getElementsByName("csexo");
	var confirma_senha = document.getElementById("cconfirm-senha").value;

	for ( var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			userObj.sexo = radio[i].value;
		}
	}

	if(userObj.nome == ""){
		document.getElementById("cerror-nome").innerHTML = "Campo Obrigatório";
		return false;
	}
	if(userObj.sobrenome == ""){
		document.getElementById("cerror-sobrenome").innerHTML = "Campo Obrigatório";
		return false;
	}
	if(userObj.senha != confirma_senha){
		document.getElementById("cerror-confirmasenha").innerHTML = "Senhas não conferem";
		return false;
	}
}

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

/**************************************************************************/
/*Funcoes para Cookies*/
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname) {
	setCookie(cname,"",-1);
}

function checkUserOnline(argument) {
	var logObj = {
					email: "",
					senha: ""
				};
	logObj.email = getCookie("email");
	logObj.senha = getCookie("senha");

	var obj = pesquisarBD(logObj);

	if (obj != null) {
		if (obj.email == logObj.email && obj.senha == logObj.senha){
			alert("Usuário " + obj.nome + "ja estava logado");

			/*ligar funçoes de usuario logado*/
		}
		else {
			deleteCookie("email");
			deleteCookie("senha");
			var str = location.href;
			if (str.indexOf("perfil") != -1 ) {
				window.location.assign("login.html");
			}
		}
	}
	else{
		deleteCookie("email");
		deleteCookie("senha");
		if (str.indexOf("perfil") != -1 ) {
			window.location.assign("login.html");
		}
	}
}
/*******************************************************************************/

function lerParametro () {
	var params = new URLSearchParams(document.location.search.substring(1));
	prof = params.get("prof"); 
	document.getElementById("prof").value = prof;
	pesquisarProfissionais(prof);
}

function lerFiltro () {
	var c = document.getElementById("prof").value;
	pesquisarProfissionais(c.toLowerCase());
}