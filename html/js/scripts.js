function gravarLocal (userObj) {
	var userObjJSON = JSON.stringify(userObj);
	localStorage.setItem(userObj.nome, userObjJSON);
	alert(JSON.stringify(userObj));
}

function pesquisarLocal(userObj) {
	var text = localStorage.getItem(userObj.nome);
	obj = JSON.parse(text);
	return obj;
}


function entrar () {
			var logObj = {
						nome: "",
						senha: ""
					};
			logObj.nome = document.getElementById("nome").value;
			logObj.senha = document.getElementById("senha").value;

			obj = pesquisarLocal(logObj);
			
			if (obj != null) {
				if (obj.nome == logObj.nome && obj.senha == logObj.senha){
					alert("Seja bem vindo " + obj.nome);
					document.getElementById("demo").innerHTML = obj.nome;
					setCookie("nome", obj.nome, 1);
					setCookie("senha", obj.senha, 1);
					window.location.assign("dadoscadastrais.html");
					/*Criar cookie ou sessão*/
				}
				else {
					alert("Usuário ou senha incorreta");
				}
			}
			else{
				alert("Usuário ou senha incorreta");
			}			
		}


function cadastrar(){
			var userObj = {
							nome: "",
							sobrenome: "",
							tipo: "",
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
			userObj.email = document.getElementById("email").value;
			userObj.senha = document.getElementById("senha").value;
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

			window.location.assign("dadoscadastrais.html");

}


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