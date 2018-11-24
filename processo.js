var processos = [];
var pids = -1;
var tempo = 0;

var Processo = function (pid, tempochegada, tempoexecucao, deadline) {
	this.pid = pid,
	this.tempochegada = tempochegada,
	this.tempoexecucao = tempoexecucao,
	this.deadline = deadline
	this.turnaround = 0;
};

function criarprocesso(){
	tempochegada = document.getElementById('chegada').value - 0;
	tempoexecucao = document.getElementById('execucao').value - 0;
	deadline = document.getElementById('deadline').value - 0;
	pids += 1;

	var processo = new Processo(pids, tempochegada, tempoexecucao, deadline);
	processos.push(processo);
	console.log(processos);
}

function SJF(){
	processos.sort(function(a, b){
		return a.tempoexecucao - b.tempoexecucao;
	})
	console.log(processos);

	tempo += processos[0].tempoexecucao;

	for (var i = 1; i < processos.length; i++) {
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

	for (var i = 1; i < processos.length; i++) {
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

	for (var i = 1; i < processos.length; i++) {
		processos[i].turnaround += (tempo - processos[i].tempochegada);
		tempo += processos[i].tempoexecucao;
	}
}

function RR(){
	processos.sort(function(a, b){ // fifo
		return a.tempochegada - b.tempochegada;
	})

	quantum = document.getElementById('quantum').value - 0;
	sobrecarga = document.getElementById('sobrecarga').value - 0;
	ta = 0;
	qtdprocessos = processos.length;

	while(processos.length > 0){
		console.log("tempo inicial", tempo);
		if(processos[0].tempochegada <= tempo){
			if (processos[0].tempoexecucao >= quantum) {
				processos[0].tempoexecucao -= quantum;
				tempo+=quantum;


				console.log("tempo + quantum", tempo);
				if (processos[0].tempoexecucao!=0) {
					processos.push(processos[0]);
					tempo += sobrecarga;
				}
				else {
					console.log("tempo inicial", tempo);	
					processos[0].turnaround += tempo - processos[0].tempochegada;
					document.getElementById('tabela').innerHTML += '<tr><td>' + processos[0].pid + '</td><td>' + processos[0].turnaround + '</td></tr>';
					ta += processos[0].turnaround;
				}
				processos.splice(0, 1);
			}
			else {
				tempo += processos[0].tempoexecucao;
				processos[0].turnaround += tempo - processos[0].tempochegada;
				document.getElementById('tabela').innerHTML += '<tr><td>' + processos[0].pid + '</td><td>' + processos[0].turnaround + '</td></tr>';
				ta += processos[0].turnaround;
				processos.splice(0, 1);
			}
		}
		else{
			tempo++;
		}
	}	
}

/*function RR(){
	processos.sort(function(a, b){ // fifo
		return a.tempochegada - b.tempochegada;
	})

	quantum = document.getElementById('quantum').value - 0;
	sobrecarga = document.getElementById('sobrecarga').value - 0;
	final = 0; // quantidade de processos que já terminaram de executar

	for (var i = 0; i < processos.length; i++) {
		if (processos[i].tempochegada<=tempo) { // se o proximo processo já chegou

			// Escrever na tabela inicios
			document.getElementById('tabela').innerHTML += '<tr><td>' + tempo + '</td><td>' + processos[i].pid + '</td><td>' + processos[i].turnaround + '</td><td>';
			for(var j=i+1; j<processos.length; j++){
				if(processos[i].tempoexecucao!=0 && processos[i].tempochegada<=tempo){
					document.getElementById('tabela').innerHTML += processos[j].pid + ' ';
				}
			}
			for(var j=0; j<i; j++){
				if(processos[i].tempoexecucao!=0 && processos[i].tempochegada<=tempo){
					document.getElementById('tabela').innerHTML += processos[j].pid + ' ';
				}
			}
			document.getElementById('tabela').innerHTML += '</td></tr>';
			// Escrever na tabela finals

			if(processos[i].tempoexecucao!=0){ // Se o processo não terminou
				if (processos[i].tempoexecucao>=quantum) { //...//
					processos[i].tempoexecucao-=quantum;

					if (processos[i].tempoexecucao==0) {
						final++;
					}										// soma ao tempo o valo do quantum
															// soma do quantum ao turnaround do processo
					tempo+=quantum;							// subtracao do tempo de execucao do processo, o valor do quantum
					processos[i].turnaround += quantum;
				}
				else {
					tempo+=processos[i].tempoexecucao;
					processos[i].turnaround+=processos[i].tempoexecucao;
					processos[i].tempoexecucao=0; 
					final++;
				}											//...//
			}

			if (final==processos.length) {break;} // se todos os processos terminaram, para
			else{
				tempo+=sobrecarga;
				if(i==processos.length-1){i=0;}
			}
		}
		else{
			tempo++;
		}
	}
}*/