const ATTACK_VALUE = 10;
const STR_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 30;
const HEAL_VALUE = 20;
const LOG_PLAYER_ATTACK = "PLAYER ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER STRONG ATTACK";
const LOG_MONSTER_ATTACKED = "MONSTER ATTACK";
const LOG_PLAYER_HEAL = "PLAYER HEAL";
const inputHp = parseInt(prompt("ENTER HP"));

let chosenMaxHp = inputHp;

if (isNaN(inputHp) || inputHp <= 0) {
  chosenMaxHp = prompt("BE SERIOUS");
}

let battleLog = [];
let battleLogStop;
let monsterHp = chosenMaxHp;
let playerHp = chosenMaxHp;
let hasBonusLife = true;

adjustHealthBars(chosenMaxHp);

function reset() {
  monsterHp = chosenMaxHp;
  playerHp = chosenMaxHp;
  resetGame(chosenMaxHp);
}

function endRound() {
  const monsterDmg = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  playerHp -= monsterDmg;

  if (playerHp <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    playerHp = chosenMaxHp;
    setPlayerHealth(chosenMaxHp);
    alert("BONUS LIFE!");
  }

  if (monsterHp <= 0 && playerHp > 0) {
    alert("OMGGGGG!!! YOU ACTUALLY WON");
    reset();
  } else if (playerHp <= 0 && monsterHp > 0) {
    alert("YOU LOST n00b");
    reset();
  } else if (playerHp <= 0 && monsterHp <= 0) {
    alert("DRAW?");
    reset();
  }
  return monsterDmg;
}

function attack(typeOfAttack) {
  let maxDmg;
  let attackMode;
  if (typeOfAttack === 0) {
    maxDmg = ATTACK_VALUE;
    attackMode = LOG_PLAYER_ATTACK;
  } else if (typeOfAttack === 1) {
    maxDmg = STR_ATTACK_VALUE;
    attackMode = LOG_PLAYER_STRONG_ATTACK;
  }

  const dmg = dealMonsterDamage(maxDmg);
  monsterHp -= dmg;

  const monsterDmg = endRound();
  writeToLog(attackMode, dmg, monsterDmg, monsterHp, playerHp);
}

function writeToLog(event, value, monsterDmg, monsterHp, playerHp) {
  let logEntry = {
    event: event,
    value: value,
    monsterDmg: monsterDmg,
    monsterHp: monsterHp,
    playerHp: playerHp,
  };
  battleLog.push(logEntry);
}

function onClickAttack() {
  attack(0);
}

function onClickStrAttack() {
  attack(1);
}

function onClickHeal() {
  if (playerHp >= chosenMaxHp - HEAL_VALUE) {
    alert("YOU ARE OVERHEALING!");
  } else {
    increasePlayerHealth(HEAL_VALUE);
    playerHp += HEAL_VALUE;
  }
  const monsterDmg = endRound();
  writeToLog(LOG_PLAYER_HEAL, HEAL_VALUE, monsterDmg, monsterHp, playerHp);
}

function onClickShowLog() {
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!battleLogStop && battleLogStop !== 0) || battleLogStop < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key}: ${logEntry[key]}`);
      }
      battleLogStop = i;
      
    }
    i++;
  }
}

attackBtn.addEventListener("click", onClickAttack);
strongAttackBtn.addEventListener("click", onClickStrAttack);
healBtn.addEventListener("click", onClickHeal);
logBtn.addEventListener("click", onClickShowLog);
