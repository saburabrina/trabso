var processos = [];
var pids = -1;
var tempo = 0;
turnaroundmedio = 0;
escalonamento = 0;

var Processo = function (pid, tempochegada, tempoexecucao, deadline, prioridade) {
	this.pid = pid,
	this.tempochegada = tempochegada,
	this.tempoexecucao = tempoexecucao,
	this.deadline = deadline
	this.turnaround = 0;
	this.prioridade = prioridade;
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
	}
}

function SJF(){

	processos.sort(function(a, b){
		if(a.tempochegada!=b.tempochegada){
			return a.tempochegada - b.tempochegada;
		}
		return a.tempoexecucao - b.tempoexecucao;
	})

	tempo = processos[0].tempochegada;
	for (var i = 0; i < processos.length; i++) {
		tempo += processos[i].tempoexecucao;
		processos[i].turnaround = tempo - processos[i].tempochegada;
		turnaroundmedio += processos[i].turnaround;
	}
	turnaroundmedio /= processos.length;
	console.log("Turnaround médio: ",turnaroundmedio);
	console.log(processos);

}

function EDF(){
	processos.sort(function(a, b){
		if(a.tempochegada!=b.tempochegada){
			return a.tempochegada - b.tempochegada;
		}
		return a.deadline - b.deadline;
	})

	console.log(processos);

	preempcao();
}

function FIFO(){
	processos.sort(function(a, b){
		return a.tempochegada - b.tempochegada;
	})

	tempo = processos[0].tempochegada;
	for (var i = 0; i < processos.length; i++) {
		tempo += processos[i].tempoexecucao;
		processos[i].turnaround = tempo - processos[i].tempochegada;
		turnaroundmedio += processos[i].turnaround;
	}
	turnaroundmedio /= processos.length;
	console.log("Turnaround médio :", turnaroundmedio);
	console.log(processos);
}

function RR(){
	processos.sort(function(a, b){ // fifo
		return a.tempochegada - b.tempochegada;
	})

	console.log(processos);

	preempcao();
}

function Prioridade(){
	processos.sort(function(a, b){
		if(a.tempochegada!=b.tempochegada){
			return a.tempochegada - b.tempochegada;
		}
		return a.prioridade - b.prioridade;
	})

	console.log(processos);

	preempcao();
}

function preempcao(){


	quantum = document.getElementById('quantum').value - 0;
	sobrecarga = document.getElementById('sobrecarga').value - 0;
	ta = 0;
	qtdterminados = 0;
	prontos = [];
	aux = 0;

	while(processos.length > qtdterminados){
		atualizaprontos();
		if(prontos.length > 0){ 
			console.log("O processo na frente da lista é o processo ", prontos[0].pid, " e o tempo atual é ", tempo);

			if (prontos[0].tempoexecucao > quantum) { // se o processo for executar e voltar pra fila de prontos
				
				tempo += quantum;
				tempo += sobrecarga;
				atualizaprontos();
				
				prontos[0].tempoexecucao -= quantum; // atualizar o tempo de execucao do processo e colocar ele de volta na fila
				prontos.push(prontos[0]);
				prontos.splice(0, 1);
				console.log("O processo ", prontos[prontos.length-1].pid, " agora ocupa a posição ", prontos.length-1, " da fila");
			}
			else {  // se o processo for executar e parar
				tempo += prontos[0].tempoexecucao;
				atualizaprontos();

				prontos[0].turnaround += tempo - prontos[0].tempochegada;
				console.log("O processo ", prontos[0].pid, " terminou com turnaround de ", prontos[0].turnaround, " e agora vai sair da fila no tempo " + tempo);

				document.getElementById('tabela').innerHTML += '<tr><td>' + prontos[0].pid + '</td><td>' + prontos[0].turnaround + '</td></tr>';
				ta += prontos[0].turnaround;
				prontos.splice(0, 1);
				qtdterminados++;
			}

		}
		else{
			tempo++;
		}
	}
	ta /= processos.length;
	turnaroundmedio = ta;


	function atualizaprontos(){
		for (var i = aux; i < processos.length; i++) {
			if(processos[i].tempochegada <= tempo) {
				prontos.push(processos[i]);
				console.log(prontos);
			}
			else{
				break;
			}
		}
		aux = i;
	}	
}

function savechanges(){
	document.getElementById('infoquantum').innerHTML = document.getElementById('quantum').value;
	document.getElementById('infosobrecarga').innerHTML = document.getElementById('sobrecarga').value;

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

function rodarescalonamento(){
	if (escalonamento == 0) {
		alert("Selecione um tipo de escalonamento");
	}
	else if (processos.length == 0) {
		alert("Crie processos");
	}
	else {
		if (escalonamento == 1) {
			SJF();
			tempo = 0;
			np();
		}

		else if (escalonamento == 2) {
			EDF();

		}
		else if (escalonamento == 3) {
			FIFO();
			tempo = 0;
			np();
		}

		function np(){
			aux = 0;
			prontos = [];
			setInterval(function (){
				for (var i = aux; i < processos.length; i++) {
					if(processos[i].tempochegada = tempo){
						prontos.push(processos[i]);
					}
				}
				aux = i;
				if(prontos.length > 0){
					document.getElementById('tdcpu').innerHTML = prontos[0].pid;
					document.getElementById('tdfilaprontos').innerHTML = '';
					for (var i = 1; i < prontos.length; i++) {
						document.getElementById('tdfilaprontos').innerHTML += prontos[i].pid + ' ';
					}
					prontos.splice(0, 1);
				}
				else{
					document.getElementById('tdcpu').innerHTML = '';
					document.getElementById('tdtam').innerHTML = turnaroundmedio;
				}
				console.log(tempo);
				tempo++; 
				document.getElementById('infotempo').innerHTML = tempo;
			}, 1000);	
		}	
	}
}

/* Coloca processo que acabou de executar antes do chaveamento, na fila de prontos

function RR(){
	processos.sort(function(a, b){ // fifo
		return a.tempochegada - b.tempochegada;
	})

	quantum = document.getElementById('quantum').value - 0;
	sobrecarga = document.getElementById('sobrecarga').value - 0;
	ta = 0;
	qtdterminados = 0;
	prontos = [];
	aux = 0;;

	// Enquanto os processos não forem terminados o vetor de prontos será atualizado;
	while(processos.length > qtdterminados){
		atualizaprontos();
		if(prontos.length > 0){ 
			// console.log("O processo na frente da lista é o processo ", prontos[0].pid, " e o tempo atual é ", tempo);

			if (prontos[0].tempoexecucao > quantum) { // se o processo for executar e voltar pra fila de prontos
				
				tempo += quantum;
				tempo += sobrecarga;
				// atualizaprontos();
				
				prontos[0].tempoexecucao -= quantum; // atualizar o tempo de execucao do processo e colocar ele de volta na fila
				prontos.push(prontos[0]);
				prontos.splice(0, 1);
				console.log("O processo ", prontos[prontos.length-1].pid, " agora ocupa a posição ", prontos.length-1, " da fila");
			}
			else {  // se o processo for executar e parar
				tempo += prontos[0].tempoexecucao;
				// atualizaprontos();

				prontos[0].turnaround += tempo - prontos[0].tempochegada;
				console.log("O processo ", prontos[0].pid, " terminou com turnaround de ", prontos[0].turnaround, " e agora vai sair da fila no tempo " + tempo);

				document.getElementById('tabela').innerHTML += '<tr><td>' + prontos[0].pid + '</td><td>' + prontos[0].turnaround + '</td></tr>';
				ta += prontos[0].turnaround;
				prontos.splice(0, 1);
				qtdterminados++;
			}

		}
		else{
			tempo++;
		}
	}


	// Funcao que atualia o vetor de prontos verificando se o tempo de chegada de cada processo é menor que o tempo em execução no programa;
	function atualizaprontos(){
		for (var i = aux; i < processos.length; i++) {
			if(processos[i].tempochegada <= tempo) {
				prontos.push(processos[i]);
			} else {
				break;
			}
			console.log('i ', i);
			console.log(prontos);

		}
		aux = i;
		console.log('Aux', aux);
	}
}
*/