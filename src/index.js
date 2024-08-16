const readline = require("readline");

const players = [
  {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
];

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function selectCharacter() {
  return new Promise((resolve, reject) => {
    console.log("Escolha um personagem:");
    players.forEach((player, index) => {
      console.log(`${index + 1} - ${player.NOME}`);
    });

    r1.question("Diigte o número do personagem: ", (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < players.length) {
        const selectedPlayer = players[index];
        console.log(`Você escolheu o personagem ${selectedPlayer.NOME}.`);
        resolve(selectedPlayer);
      } else {
        console.log("Personagem inválido. Tente novamente.");
        reject(new Error("Personagem inválido."));
      }
    });
  });
}

function selectCharacterComputer() {
  const randomIndex = Math.floor(Math.random() * players.length);
  const selectedPlayer = players[randomIndex];
  console.log(`O computador escolheu o personagem ${selectedPlayer.NOME}.`);
  return selectedPlayer;
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function selectRandomBlock() {
  const random = Math.random();

  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

function logRollResult(characterName, block, diceResult, attibute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attibute} = ${
      diceResult + attibute
    }`
  );
}

function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    const block = selectRandomBlock();
    console.log(`Bloco: ${block}.`);

    // rolar os dados
    const diceResult1 = rollDice();
    const diceResult2 = rollDice();

    // teste de habilidade
    let totalTestSkill1, totalTestSkill2;

    switch (block) {
      case "RETA":
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
        logRollResult(
          character1.NOME,
          "velocidade",
          diceResult1,
          character1.VELOCIDADE
        );
        logRollResult(
          character2.NOME,
          "velocidade",
          diceResult2,
          character2.VELOCIDADE
        );
        break;
      case "CURVA":
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
        logRollResult(
          character1.NOME,
          "manobrabilidade",
          diceResult1,
          character1.MANOBRABILIDADE
        );
        logRollResult(
          character2.NOME,
          "manobrabilidade",
          diceResult2,
          character2.MANOBRABILIDADE
        );
        break;
      case "CONFRONTO":
        const powerResult1 = diceResult1 + character1.PODER;
        const powerResult2 = diceResult2 + character2.PODER;

        console.log(`${character1.NOME} confrontou com ${character2.NOME}🥊`);
        logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
        logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto.`
          );
          character2.PONTOS--;
        } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto.`
          );
          character1.PONTOS--;
        } else {
          console.log("Empate! Ninguém perdeu ponto.");
        }
        break;
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("----------------------------------------------");
  }
}

function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} pontos(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} pontos(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n🏆 ${character1.NOME} venceu a corrida! Parabéns 🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n🏆 ${character2.NOME} venceu a corrida! Parabéns 🏆`);
  } else {
    console.log("\nA corrida terminou empatada! 🏁");
  }
}

(async function main() {
  const player1 = await selectCharacter();
  const player2 = selectCharacterComputer();
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
  );

  playRaceEngine(player1, player2);
  declareWinner(player1, player2);
})();
