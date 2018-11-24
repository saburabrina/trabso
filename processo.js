var processos = [];
var qtdprocessos = 0;
var pids = -1;
var tempo = 0;

var Processo = function (pid, tempochegada, tempoexecucao, deadline) {
	this.pid = pid,
	this.tempochegada = tempochegada,
	this.tempoexecucao = tempoexecucao,
	this.deadline = deadline
	this.turnaround = tempoexecucao;
};

function criarprocesso(){
	tempochegada = document.getElementById('chegada').value;
	tempoexecucao = document.getElementById('execucao').value;
	deadline = document.getElementById('deadline').value;
	pids += 1;

	var processo = new Processo(pids, tempochegada, tempoexecucao, deadline);
	processos.push(processo);
	console.log(processos);
	qtdprocessos++;
}

function SJF(){
	processos.sort(function(a, b){
		return a.tempoexecucao - b.tempoexecucao;
	})
	console.log(processos);

	tempo += processos[0].tempoexecucao;

	for (var i = 1; i < qtdprocessos; i++) {
		processos[i].turnaround += (tempo - processos[i].tempochegada);
		tempo += processos[i].tempoexecucao;
	}
}

function EDF(){
	processos.sort(function(a, b){
		return a.deadline - b.deadline;
	})
	console.log(processos);

	tempo += processos[0].tempoexecucao;

	for (var i = 1; i < qtdprocessos; i++) {
		processos[i].turnaround += (tempo - processos[i].tempochegada);
		tempo += processos[i].tempoexecucao;
	}
}

function FIFO(){
	processos.sort(function(a, b){
		return a.tempochegada - b.tempochegada;
	})
	console.log(processos);
	
	tempo += processos[0].tempoexecucao;

	for (var i = 1; i < qtdprocessos; i++) {
		processos[i].turnaround += (tempo - processos[i].tempochegada);
		tempo += processos[i].tempoexecucao;
	}
}

function RR(){
	FIFO();
	quantum = document.getElementById('quantum').value;
	final = 0;

	for (var i = 0; i < qtdprocessos; i++) {
		if(processos[i].tempoexecucao!=0){
			if (processos[i].tempoexecucao>=quantum) {
				processos[i].tempoexecucao-=quantum;
				if (processos[i].tempoexecucao==0) {
					final++;
				}
			}
			else {
				processos[i].tempoexecucao=0; 
				final++;
			}

			document.getElementById('cpu').innerHTML += 'Processo na CPU : ' + processos[i].pid + '<br>';
			document.getElementById('filaprontos').innerHTML += 'Fila Prontos : ';
			for(var j=i+1; j<qtdprocessos; j++){
				document.getElementById('filaprontos').innerHTML += '' + processos[j].pid + ', ';
			}
			for(var j=0; j<i; j++){
				document.getElementById('filaprontos').innerHTML += '' + processos[j].pid + ', ';
			}
			document.getElementById('filaprontos').innerHTML += '<br>';
		}
		
		if (final==qtdprocessos) {break;}
		else if(i==qtdprocessos-1){i=0;}
	}
}