var processos = [];
var pids = -1;
var tempo = 0;
turnaroundmedio = 0;

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

function SJF(){processos.sort(function(a, b){
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
		console.log(processos[i].turnaround);
	}
	turnaroundmedio /= processos.length;
	console.log(turnaroundmedio);
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
		console.log(processos[i].turnaround);
	}
	turnaroundmedio /= processos.length;
	console.log(turnaroundmedio);
	console.log(processos);
}

function RR(){
	processos.sort(function(a, b){ // fifo
		return a.tempochegada - b.tempochegada;
	})

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