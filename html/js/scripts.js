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
	for(var i =0, a = []; i < localStorage.length; i++){
  		a[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));

  		if (a[i].tipo == "profissional" && a[i].profissao == sprof) {
  			imprimePesquisaProfissionais(a[i]);
  		}
	}
}

function imprimePesquisaProfissionais(userObj) {
	/*Fazer*/
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
					window.location.assign("perfil.html");
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

			window.location.assign("perfil.html");

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
