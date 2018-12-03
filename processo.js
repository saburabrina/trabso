var processos = [];
var pids = -1;
var tempo = 0; // do clock
turnaroundmedio = 0;
escalonamento = 0;
paraescalonamnto = 0;
delay = 1000; // quantos milésimos de segundo vale o clock
qtdexecutados = 0;
prontos = [];
aux = 0;
var xua;
executando = [];
quantumctrl = 0;
sobrecargactrl = false;
disco = [];
escmemoria = 1;
celulasram = ["a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9",
			"b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9",
			"c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9",
			"d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9",
			"e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9" ]

var Processo = function (pid, tempochegada, tempoexecucao, deadline, prioridade) {
	this.pid = pid,
	this.tempochegada = tempochegada,
	this.tempoexecucao = tempoexecucao,
	this.deadline = deadline,
	this.turnaround = 0,
	this.prioridade = prioridade,
	this.cor = gera_cor();

	function gera_cor() {
	    var hexadecimais = '0123456789ABCDEF';
	    var cor = '#';
	    for (var i = 0; i < 6; i++ ) {
	        cor += hexadecimais[Math.floor(Math.random() * 16)];
	    }
	    return cor;
	}
};

function criarprocesso(){
	tempochegada = document.getElementById('chegada').value - 0;
	tempoexecucao = document.getElementById('execucao').value - 0;
	deadline = document.getElementById('deadline').value - 0;
	prioridade = document.getElementById('prioridade').value - 0;
	pids += 1;

	var processo = new Processo(pids, tempochegada, tempoexecucao, deadline, prioridade);
	processos.push(processo);
	console.log(processos);

	criarprocessofront();

	function criarprocessofront(){
		document.getElementById('tabelaprocessos').innerHTML += '<tr><td headers="tdpid">' + pids + '</td><td headers="tdtc">' + tempochegada + '</td><td headers="tdte">' + tempoexecucao + '</td><td headers="tdd">' + deadline + '</td><td headers="tdp">' + prioridade + '</td></tr><br>';
		document.getElementById('divGrafico').innerHTML += '<div id="' + pids + '" class="m-1 row"><div class="col-1">' + pids + '</div></div>';
		document.getElementById('corpo').innerHTML += '<tr><td><i style="color: ' + processo.cor + ';" class="fas fa-circle"></i></td><td>'+ pids +'</td></tr>';
	}
}


function FIFO(){
	processos.sort(function(a, b){
		return a.tempochegada - b.tempochegada;
	})

	console.log(processos);
}

function savechanges(){
	document.getElementById('infoquantum').innerHTML = document.getElementById('quantum').value;
	document.getElementById('infosobrecarga').innerHTML = document.getElementById('sobrecarga').value;
	delay = document.getElementById('clock').value * 1000;

	if (escalonamento == 1) { document.getElementById('infoescalonamento').innerHTML = "SJF";}
	else if (escalonamento == 2) { document.getElementById('infoescalonamento').innerHTML = "EDF";}
	else if (escalonamento == 3) { document.getElementById('infoescalonamento').innerHTML = "FIFO";}
	else if (escalonamento == 4) { document.getElementById('infoescalonamento').innerHTML = "RR";}
	else { document.getElementById('infoescalonamento').innerHTML = "Prioridade";}
}

function selecionado(id){
	document.getElementById(id).style.backgroundColor = "white";
	document.getElementById(id).style.color = "#66CDAA";

	if (id == 'sjfbtn') {
		document.getElementById('edfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('edfbtn').style.color = "#F0F8FF";

		document.getElementById('fifobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('fifobtn').style.color = "#F0F8FF";

		document.getElementById('rrbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('rrbtn').style.color = "#F0F8FF";

		document.getElementById('priobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('priobtn').style.color = "#F0F8FF";

		escalonamento = 1;
	}
	else if (id == 'edfbtn') {
		document.getElementById('sjfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('sjfbtn').style.color = "#F0F8FF";

		document.getElementById('fifobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('fifobtn').style.color = "#F0F8FF";

		document.getElementById('rrbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('rrbtn').style.color = "#F0F8FF";

		document.getElementById('priobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('priobtn').style.color = "#F0F8FF";

		escalonamento = 2;
		
	}
	else if (id == 'fifobtn') {
		document.getElementById('sjfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('sjfbtn').style.color = "#F0F8FF";

		document.getElementById('edfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('edfbtn').style.color = "#F0F8FF";

		document.getElementById('rrbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('rrbtn').style.color = "#F0F8FF";

		document.getElementById('priobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('priobtn').style.color = "#F0F8FF";
		
		escalonamento = 3;
	}
	else if (id == 'rrbtn') {
		document.getElementById('sjfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('sjfbtn').style.color = "#F0F8FF";

		document.getElementById('edfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('edfbtn').style.color = "#F0F8FF";

		document.getElementById('fifobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('fifobtn').style.color = "#F0F8FF";

		document.getElementById('priobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('priobtn').style.color = "#F0F8FF";
		
		escalonamento = 4;
	}
	else {
		document.getElementById('sjfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('sjfbtn').style.color = "#F0F8FF";

		document.getElementById('edfbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('edfbtn').style.color = "#F0F8FF";

		document.getElementById('rrbtn').style.backgroundColor = "#66CDAA";
		document.getElementById('rrbtn').style.color = "#F0F8FF";

		document.getElementById('fifobtn').style.backgroundColor = "#66CDAA";
		document.getElementById('fifobtn').style.color = "#F0F8FF";
		
		escalonamento = 5;

	}
}

function pausarescalonamento(){
	paraescalonamnto ++;

	document.getElementById("botaoplay").disabled = false;
	document.getElementById("botaopause").disabled = true;
	document.getElementById("botaostop").disabled = false;
}

function pararescalonamento(){
	paraescalonamnto ++;

	escalonamento = 0;
	document.getElementById('infoescalonamento').innerHTML = "ND";
	document.getElementById('sjfbtn').style.backgroundColor = "#66CDAA";
	document.getElementById('sjfbtn').style.color = "#F0F8FF";
	document.getElementById('edfbtn').style.backgroundColor = "#66CDAA";
	document.getElementById('edfbtn').style.color = "#F0F8FF";
	document.getElementById('fifobtn').style.backgroundColor = "#66CDAA";
	document.getElementById('fifobtn').style.color = "#F0F8FF";
	document.getElementById('priobtn').style.backgroundColor = "#66CDAA";
	document.getElementById('priobtn').style.color = "#F0F8FF";
	document.getElementById('rrbtn').style.backgroundColor = "#66CDAA";
	document.getElementById('rrbtn').style.color = "#F0F8FF";

	processos = [];
	prontos = [];
	document.getElementById('tabelaprocessos').innerHTML = '';
	document.getElementById('divGrafico').innerHTML = '';

	tempo = 0;
	document.getElementById('infotempo').innerHTML = tempo;

	turnaroundmedio = 0;
	document.getElementById('tdcpu').innerHTML = '<br>';
	document.getElementById('tdfilaprontos').innerHTML = '<br>';
	document.getElementById('tdtam').innerHTML = '<br>';

	document.getElementById("botaoplay").disabled = false;
	document.getElementById("botaopause").disabled = true;
	document.getElementById("botaostop").disabled = true;

	qtdexecutados = 0;
	aux = 0;
	quantumctrl = 0;
	sobrecargactrl = 0;
}

function rodarescalonamento(){
	paraescalonamnto = 0;

	if (escalonamento == 0) {
		alert("Selecione um tipo de escalonamento");
	}
	else if (processos.length == 0) {
		alert("Crie processos");
	}
	else {
		document.getElementById("botaoplay").disabled = true;
		document.getElementById("botaopause").disabled = false;
		document.getElementById("botaostop").disabled = false;

		FIFO();

		if (escalonamento == 1 || escalonamento == 3) {
			nptimer();
		}

		else {
			quantum = document.getElementById('quantum').value - 0;
			sobrecarga = document.getElementById('sobrecarga').value - 0;
			quantumctrl = 0;
			sobrecargactrl = 0;

			ptimer();
		}	
	}
}

function nptimer(){ // para não preemptivos
	document.getElementById('infotempo').innerHTML = tempo;

	if (paraescalonamnto > 0) {
		return;
	}

	for (var i = aux; i < processos.length; i++) {
		if(processos[i].tempochegada == tempo){
			prontos.push(processos[i]);
			console.log("Processo ", prontos[prontos.length-1].pid, " com tempochegada ", prontos[prontos.length-1].tempochegada, " entrou na fila de prontos no tempo ", tempo);

			counter = 7;
			for(var j = 0; j < celulasram.length; j++){ // first fit
				if (document.getElementById(celulasram[j]).style.visibility == "hidden") {
					document.getElementById(celulasram[j]).style.visibility = "visible";
					document.getElementById(celulasram[j]).style.color = processos[i].cor;
					document.getElementById('memvirtual').innerHTML += '<td>' + j + '</td>';
					counter--;
				}
				if (counter==0) {
					break;
				}
			}
			if (counter!=0) {
				for (var k = 0; k < counter; k++) {
					disco.push(processos[i]);
					document.getElementById('memvirtual').innerHTML += '<td>i</td>';

				}
			}

		}
		else {
			break;
		}
	}
	aux = i;

	document.getElementById('disco').innerHTML = ''
	for (var i = 0; i < disco.length; i++) {
		document.getElementById('disco').innerHTML += '<td>'+ disco[i].pid + '</td>';
	}

	for (var i = aux; i < processos.length; i++) {
		document.getElementById(processos[i].pid).innerHTML += '<i style="color: #F0F8FF" class="fas fa-square"></i>'
	}

	if (escalonamento == 1) {
		prontos.sort(function(a, b){ return a.tempoexecucao - b.tempoexecucao; })
	}

	if (executando.length == 0) {
		if(prontos.length > 0){
			executando.push(prontos[0]);
			prontos.splice(0, 1);
		}
		else {
			document.getElementById('tdcpu').innerHTML = '';
			console.log("Fila de prontos vazia no tempo ", tempo);

			if(qtdexecutados == processos.length){
				document.getElementById('tdtam').innerHTML = turnaroundmedio;
			}
		}
	}

	if(executando.length == 1){

		console.log("Processo ", executando[0].pid, " executando no tempo ", tempo);


		document.getElementById('tdcpu').innerHTML = executando[0].pid;
		document.getElementById(executando[0].pid).innerHTML += '<i style="color: #00FF00" class="fas fa-square"></i>'
		document.getElementById('tdfilaprontos').innerHTML = '';
		for (var i = 0; i < prontos.length; i++) {
			document.getElementById('tdfilaprontos').innerHTML += prontos[i].pid + ' ';
			document.getElementById(prontos[i].pid).innerHTML += '<i style="color: #FFFF00" class="fas fa-square"></i>'
		}

		executando[0].tempoexecucao --;
		if (executando[0].tempoexecucao == 0) {
			console.log("Processo ", executando[0].pid, " terminou de executar no tempo ", tempo + 1);
			executando[0].turnaround = tempo + 1 - executando[0].tempochegada;
			executando[0].turnaround /= processos.length;
			turnaroundmedio += executando[0].turnaround;
			executando.splice(0, 1);
			qtdexecutados++;
		}
	}

	tempo++; 
	setTimeout(nptimer, delay);
}

function ptimer(){ // para preemptivos
	document.getElementById('infotempo').innerHTML = tempo;

	if (paraescalonamnto > 0) {
		return;
	}

	for (var i = aux; i < processos.length; i++) {
			
		if(processos[i].tempochegada == tempo){
			prontos.push(processos[i]);
			console.log("Processo ", prontos[prontos.length-1].pid, " com tempochegada ", prontos[prontos.length-1].tempochegada, " entrou na fila de prontos no tempo ", tempo);

			counter = 7;
			for(var j = 0; j < celulasram.length; j++){ // first fit
				if (document.getElementById(celulasram[j]).style.visibility == "hidden") {
					document.getElementById(celulasram[j]).style.visibility = "visible";
					document.getElementById(celulasram[j]).style.color = processos[i].cor;
					document.getElementById('memvirtual').innerHTML += '<td>' + j + '</td>';
					counter--;
				}
				if (counter==0) {
					break;
				}
			}
			if (counter!=0) {
				for (var k = 0; k < counter; k++) {
					disco.push(processos[i]);
					document.getElementById('memvirtual').innerHTML += '<td>i</td>';
				}
			}
		}
		else {
			break;
		}
	}
	aux = i;

	document.getElementById('disco').innerHTML = '<tr>'
	for (var i = 0; i < disco.length; i++) {
		document.getElementById('disco').innerHTML += '<td>'+ disco[i].pid + '</td>';
	}
	document.getElementById('disco').innerHTML += '</tr>';

	for (var i = aux; i < processos.length; i++) {
		document.getElementById(processos[i].pid).innerHTML += '<i style="color: #F0F8FF" class="fas fa-square"></i>'
	}

	if (escalonamento == 2) { // edf
		prontos.sort(function(a, b){ return a.deadline - b.deadline; }) 
	}
	else if (escalonamento == 5) { // prioridade
		prontos.sort(function(a, b){ return a.prioridade - b.prioridade; }) 
	}

	if (executando.length == 0) {
		if (sobrecargactrl == true) {
			if (sobrecarga == 0) {
				sobrecargactrl = false;
				sobrecarga = document.getElementById('sobrecarga').value - 0;

				prontos.push(xua);
				executando.push(prontos[0]);
				prontos.splice(0, 1);

				if (escalonamento == 2) { // edf
					prontos.sort(function(a, b){ return a.deadline - b.deadline; }) 
				}
				else if (escalonamento == 5) { // prioridade
					prontos.sort(function(a, b){ return a.prioridade - b.prioridade; }) 
				}

			}
			else {
				sobrecarga --;
				console.log("Sobrecarga no tempo ", tempo);
				document.getElementById('tdcpu').innerHTML = "S";
				document.getElementById('tdfilaprontos').innerHTML = '';
				document.getElementById(xua.pid).innerHTML += '<i style="color: #FF0000" class="fas fa-square"></i>'
				for (var i = 0; i < prontos.length; i++) {
					document.getElementById('tdfilaprontos').innerHTML += prontos[i].pid + ' ';
					document.getElementById(prontos[i].pid).innerHTML += '<i style="color: #FFFF00" class="fas fa-square"></i>'
				}
			}
		}
		else {
			if(prontos.length > 0){
				executando.push(prontos[0]);
				prontos.splice(0, 1);
			}
			else {
				document.getElementById('tdcpu').innerHTML = '';
				console.log("Fila de prontos vazia no tempo ", tempo);

				if(qtdexecutados == processos.length){
					document.getElementById('tdtam').innerHTML = turnaroundmedio;
				}
			}
		}
	}

	if(executando.length == 1){

		console.log("Processo ", executando[0].pid, " executando no tempo ", tempo);
		document.getElementById('tdcpu').innerHTML = executando[0].pid;
		document.getElementById(executando[0].pid).innerHTML += '<i style="color: #00FF00" class="fas fa-square"></i>'

		document.getElementById('tdfilaprontos').innerHTML = '';
		for (var i = 0; i < prontos.length; i++) {
			document.getElementById('tdfilaprontos').innerHTML += prontos[i].pid + ' ';
			document.getElementById(prontos[i].pid).innerHTML += '<i style="color: #FFFF00" class="fas fa-square"></i>'
		}

		executando[0].tempoexecucao --;
		quantumctrl++;
		if (executando[0].tempoexecucao == 0) {
			
			console.log("Processo ", executando[0].pid, " terminou de executar no tempo ", tempo + 1);
			executando[0].turnaround = tempo + 1 - executando[0].tempochegada;
			executando[0].turnaround /= processos.length;
			turnaroundmedio += executando[0].turnaround;
			executando.splice(0, 1);
			qtdexecutados++;
			quantumctrl = 0;
		}
		else if (quantumctrl == quantum) {
			sobrecargactrl = true;
			xua = executando[0];
			executando.splice(0, 1);
			quantumctrl = 0;
		}

	}

	tempo++; 
	setTimeout(ptimer, delay);
}