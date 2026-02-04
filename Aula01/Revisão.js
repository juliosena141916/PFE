//Atividade 01 - Verificador de Turno e Prioridade

// hora = prompt("Coloque a hora");
// prioridade = prompt("Coloque o nivel de prioridade");
// turno = ""

// if (hora >= 0 && hora < 12) {
//   turno = "Manhã"
// } else if (hora >= 12 && hora < 18) {
//   turno = "Tarde"
// } else if (hora >= 19 && hora < 24) {
//   turno = "Noite"
// };

// if (prioridade > 8 && turno == "Manhã" || prioridade > 8 && turno == "Tarde") {
//   alert("Tarefa Critica/Urgente")
// } else if (prioridade >=7 && prioridade <9 && turno == "Manhã" || prioridade >=7 && prioridade <9 && turno == "Tarde") {
//     alert("Tarefa Importante")
// } else if (turno == "Noite" || prioridade < 7) {
//     alert("Tarefa Não Importante")
// };

// if (hora < 0 || hora > 23){
//     alert("Horário Inválido")
// };

// if (prioridade < 0 || prioridade > 10){
//     alert("Prioridade Inválida")
// };

//Atividade 02 - Calculadora de Gastos Mensais

// salario = parseInt(prompt("Insira o valor do seu salário"));
// aluguel = parseInt(prompt("Insira o valor do seu aluguel"));
// alimentacao = parseInt(prompt("Insira o valor da sua alimentação"));
// lazer = parseInt(prompt("Insira o valor do seu lazer"));

// restante = parseInt(salario - (aluguel + alimentacao + lazer));

// if (restante > 0){
//     alert("Saldo Positivo!")
// } else if (restante == 0){
//     alert("No Limite!")
// } else if (restante < 0){
//     alert("Saldo Negativo!")
// };

//Atividade 03 - Formatador de Nomes para a Agenda

// nome = "      joão silva      ";

// function LimparNomeContato(nome){
//     alert(nome.trim().toUpperCase().split(/\s+/).length)
// };

// LimparNomeContato(nome);

//Atividade 04 - Contador de Dias para o Evento

// dataAtual = Date.now()
// dataEvento = new Date('2025-04-30')
// diferencaMil = dataAtual - dataEvento.getTime()
// diferencaDia = diferencaMil / (1000 * 60 * 60 * 24)

// Math.ceil(diferencaDia)

// alert("Faltam " + Math.ceil(diferencaDia) + (" dias para o evento"))

//Atividade 05 - Varredura de Compromissos

agendaHorarios = [8, 12, 25, 15, -2, 20]
contagemValidos = 0;

for (let horario of agendaHorarios){
    if (horario >= 0 && horario < 24){
        alert("Compromisso agendado para as " + horario);
        contagemValidos += 1;
    } else if (horario < 0 || horario >= 24){
        alert("O horario " + horario + " h não é valido")
    }
}

alert("A quantidade de horarios validos é " + contagemValidos)


