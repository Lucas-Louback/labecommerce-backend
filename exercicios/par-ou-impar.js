function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(process.argv[2], process.argv[3])
const parOuImpar = process.argv[2]
const numero = process.argv[3]
const numeroComputador = getRndInteger(0, 5)
const soma = Number(numero) + Number(numeroComputador)
const resto = soma % 2

console.log(parOuImpar, numero)


if (process.argv[2] !== "par" && process.argv[2] !== "impar" || isNaN(soma)) {
    console.log("você deve escolher entre par ou impar e um número")
} else if (parOuImpar === "par") {

    if (resto === 0) {
        console.log(`Sua escolha foi par e o seu número foi ${numero}, o número do computador do computador foi ${numeroComputador} e a soma foi ${soma}. Você ganhou, parabéns`)
    } else {
        console.log(`Sua escolha foi par e o seu número foi ${numero}, o número do computador do computador foi ${numeroComputador} e a soma foi ${soma}. Você perdeu`)
    }
} else if (parOuImpar === "impar") {
    if (resto === 0) {
        console.log(`Sua escolha foi impar e o seu número foi ${numero}, o número do computador do computador foi ${numeroComputador} e a soma foi ${soma}. Você perdeu`)
    } else {
        console.log(`Sua escolha foi impar e o seu número foi ${numero}, o número do computador do computador foi ${numeroComputador} e a soma foi ${soma}. Você ganhou, parabéns`)
    }
}


