function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const escolhaJogador = process.argv[2]
const numeroComputador = getRndInteger(0, 2)
console.log(numeroComputador)

//0=pedra, 1=papel e 2=tesoura
if (escolhaJogador === "pedra" && numeroComputador === 0) {
    console.log("Os dois escolheram pedra e empataram")
} else if (escolhaJogador === "pedra" && numeroComputador === 1) {
    console.log("Você escolheu pedra e o computador escolheu papel. O computador ganhou")
} else if (escolhaJogador === "pedra" && numeroComputador === 2) {
    console.log("Você escolheu pedra e o computador escolheu tesoura. Você ganhou")
} else if (escolhaJogador === "pedra" && numeroComputador === 0) {
    console.log("Você escolheu pedra e o computador escolheu tesoura. Você ganhou")
} else if (escolhaJogador === "papel" && numeroComputador === 0) {
    console.log("Você escolheu papel e o computador escolheu pedra. Você ganhou")
} else if (escolhaJogador === "papel" && numeroComputador === 1) {
    console.log("Os dois escolheram e empataram")
} else if (escolhaJogador === "papel" && numeroComputador === 2) {
    console.log("Você escolheu pedra e o computador escolheu tesoura. Você perdeu")
} else if (escolhaJogador === "tesoura" && numeroComputador === 0) {
    console.log("Você escolheu tesoura e o computador escolheu pedra. Você perdeu")
} else if (escolhaJogador === "tesoura" && numeroComputador === 1) {
    console.log("Você escolheu tesoura e o computador escolheu papel. Você ganhou")
} else if (escolhaJogador === "tesoura" && numeroComputador === 2) {
    console.log("Os dois escolheram tesoura e empataram")
}
