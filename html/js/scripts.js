var prof="";

/*Pesquisa dados em localstorage --- incompleta*/
function pesquisarLocal(userObj) {
	var text = localStorage.getItem(userObj.email);
	obj = JSON.parse(text);
	return obj;
}

/*Grava dados em local storage*/
function gravarLocal(userObj, tipo) {
	if (localStorage.clientes == undefined){
		localStorage.setItem("clientes", JSON.stringify([]));
	}
	if (localStorage.profissionais == undefined){
		localStorage.setItem("profissionais", JSON.stringify([]));
	}

	if (tipo == 0) {
		var table = JSON.parse(localStorage.clientes);
		userObj.id = table.length;
		table[table.length] = userObj;
		localStorage.clientes = JSON.stringify(table);
	}
	else if (tipo == 1){
		var table = JSON.parse(localStorage.profissionais);
		userObj.id = table.length;
		table[table.length] = userObj;
		localStorage.profissionais = JSON.stringify(table);
	}

}


function pesquisarLocal2(userObj){

}


/*Pesquisa por profissionais em local storage*/
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

/*Imprime na tela de pesquisa dados do profissional*/
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

/*Funcao para logar no site --- Incompleta*/
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


/*Mostra formulário do Cliente*/
function ativaFormClient() {
	document.getElementById("forms").style.display = "block";
	document.getElementById("form-client").style.display = "block";
	document.getElementById("form-prof").style.display = "none";
	//document.getElementById("div-botoes").style.display = "none";
}

/*Mostra formulário do profissional*/
function ativaFormProf() {
	document.getElementById("forms").style.display = "block";
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
					data_nascimento: document.getElementById("cdate").value
					};

	var radio = document.getElementsByName("csexo");
	var confirma_senha = document.getElementById("cconfirm-senha").value;
	var resp= true;
	
	for ( var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			userObj.sexo = radio[i].value;
		}
	}

	if(userObj.nome == ""){
		document.getElementById("cerror-nome").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if(userObj.sobrenome == ""){
		document.getElementById("cerror-sobrenome").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if(userObj.data_nascimento == ""){
		document.getElementById("cerror-data").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if(userObj.senha != confirma_senha){
		document.getElementById("cerror-confirmasenha").innerHTML = "<br>Senhas não conferem!";
		resp= false;
	}
	else if (userObj.senha.length < 8) {
		document.getElementById("cerror-senha").innerHTML = "<br>A senha deve ter no mínimo 8 caracteres!";
		resp= false;
	}

	if (resp) {
		alert("Tudo OK - vai chamar a funcao gravaLocal");
		gravarLocal(userObj, 0);
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
					tipo: "profissional"
					};

	var radio = document.getElementsByName("psexo");
	var confirma_senha = document.getElementById("pconfirm-senha").value;
	var resp= true;

	for ( var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			userObj.sexo = radio[i].value;
		}
	}

	if(userObj.nome == ""){
		document.getElementById("perror-nome").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if(userObj.sobrenome == ""){
		document.getElementById("perror-sobrenome").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if(userObj.data_nascimento == ""){
		document.getElementById("perror-data").innerHTML = "<br>Campo Obrigatório!";
		resp= false;
	}

	if (userObj.telefone == "") {
		document.getElementById('perror-telefone').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.endereco == "") {
		document.getElementById('perror-endereco').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.num_endereco == "") {
		document.getElementById('perror-numero').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.bairro == "") {
		document.getElementById('perror-bairro').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.cidade == "") {
		document.getElementById('perror-cidade').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.estado == "") {
		document.getElementById('perror-estado').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if (userObj.cep == "") {
		document.getElementById('perror-cep').innerHTML = "<br>Campo Obrigatório!";
		resp = false;
	}

	if(userObj.senha != confirma_senha){
		document.getElementById("perror-confirmasenha").innerHTML = "<br>Senhas não conferem!";
		resp= false;
	}
	else if (userObj.senha.length < 8) {
		document.getElementById("perror-senha").innerHTML = "<br>A senha deve ter no mínimo 8 caracteres!";
		resp=false;
	}


	if (resp) {
		alert("Tudo OK - vai chamar a funcao gravaLocal");
		gravarLocal(userObj);
	}

	return resp;
}	

var HTTPReq = new XMLHttpRequest();

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





/**************************************************************************/
/*Funcoes para Cookies --- Incompletas*/
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

/*Ler parametros da query da URL*/
function lerParametro () {
	var params = new URLSearchParams(document.location.search.substring(1));
	prof = params.get("prof"); 
	document.getElementById("prof").value = prof;
	pesquisarProfissionais(prof);
}

/*Ler campo de filtro da página de pesquisa e chama a funcao pesquisarProfissionais*/
function lerFiltro () {
	var c = document.getElementById("prof").value;
	pesquisarProfissionais(c.toLowerCase());
}


/*testando validação de cep pela api do correio*/
/*$(document).ready(function() {

            function limpa_formulário_cep() {
                // Limpa valores do formulário de cep.
                $("#pendereco").val("");
                $("#pbairro").val("");
                $("#pcidade").val("");
                $("#puf").val("");                
            }
            
            //Quando o campo cep perde o foco.
            $("#pcep").blur(function() {

                //Nova variável "cep" somente com dígitos.
                var cep = $(this).val().replace(/\D/g, '');

                //Verifica se campo cep possui valor informado.
                if (cep != "") {

                    //Expressão regular para validar o CEP.
                    var validacep = /^[0-9]{8}$/;

                    //Valida o formato do CEP.
                    if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        $("#pendereco").val("...");
                        $("#pbairro").val("...");
                        $("#pcidade").val("...");
                        $("#puf").val("...");

                        //Consulta o webservice viacep.com.br/
                        $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                $("#pendereco").val(dados.logradouro);
                                $("#pbairro").val(dados.bairro);
                                $("#pcidade").val(dados.localidade);
                                $("#puf").val(dados.uf);
                            } //end if.
                            else {
                                //CEP pesquisado não foi encontrado.
                                limpa_formulário_cep();
                                alert("CEP não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cep é inválido.
                        limpa_formulário_cep();
                        alert("Formato de CEP inválido.");
                    }
                } //end if.
                else {
                    //cep sem valor, limpa formulário.
                    limpa_formulário_cep();
                }
            });
        });

*/

























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

/*Grava dados em local storage*/
function gravarLocal2 (userObj) {
	userObj.id = localStorage.length;
	var userObjJSON = JSON.stringify(userObj);
	localStorage.setItem( userObj.email , userObjJSON);
	/*alert(JSON.stringify(userObj));*/
}