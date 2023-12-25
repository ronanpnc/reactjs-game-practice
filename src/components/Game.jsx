import React, { useState, useEffect } from "react";
import Log from "./Log";
import GameOver from "./GameOver";
import Entity from "./Entity.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logMessages, setLogMessages] = useState([]);

  // Special attack shall be display every 3 rounds
  const displaySpecialAttack =
    logMessages.length > 0 && logMessages.length % 3 == 0; // We use the log array to know the round index

  const gameIsOver = monsterHealth <= 0 || playerHealth <= 0;

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // Attack the monster
  function onAttackMonster() {
    const damage = getRandomValue(5, 12);

    setMonsterHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    setLogMessages((prevLogs) => [createLogAttack(false, damage), ...prevLogs]);

    // The monster will attack the player back...
    attackPlayer();
  }

  // Attack the player
  function attackPlayer() {
    const damage = getRandomValue(5, 12);
    setPlayerHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    setLogMessages((prevLogs) => [createLogAttack(true, damage), ...prevLogs]);
  }

  function onSpecialAttack() {
    const damage = getRandomValue(8, 25);
    setMonsterHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    setLogMessages((prevLogs) => [createLogAttack(false, damage), ...prevLogs]);

    // The monster will attack the player back...
    attackPlayer();
  }

  function onHeal() {
    const healing = getRandomValue(5, 12);
    setPlayerHealth((prevHealth) => Math.min(prevHealth + healing, 100));
    setLogMessages((prevLogs) => [createLogHeal(healing), ...prevLogs]);

    // The monster will attack the player back...
    attackPlayer();
  }

  function onKillPlayer() {
    setPlayerHealth(0);
  }

  function onRestartGame() {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogMessages([]);
  }

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  function gameOverSection() {
    if (gameIsOver) {
      let gameOverTitle = undefined;

      if (monsterHealth == 0 && playerHealth == 0) {
        gameOverTitle = "It's a draw!";
      } else if (monsterHealth > 0) {
        gameOverTitle = "Monster has won !";
      } else {
        gameOverTitle = "Player has won !";
      }

      return (
        <GameOver gameOverTitle={gameOverTitle} restartGame={onRestartGame} />
      );
    } else {
      return undefined;
    }
  }

  function controlSection() {
    if (gameIsOver) {
      return undefined;
    } else {
      return (
        <section id="controls">
          <button onClick={onAttackMonster}>ATTACK</button>
          <button onClick={onSpecialAttack} disabled={!displaySpecialAttack}>
            SPECIAL !
          </button>
          <button onClick={onHeal}>HEAL</button>
          <button onClick={onKillPlayer}>KILL YOURSELF</button>
        </section>
      );
    }
  }

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <>
      <Entity entityHealth={playerHealth} entityHealthName="Your Health" />
      <Entity entityHealth={monsterHealth} entityHealthName="Monster Health" />

      {gameOverSection()}
      {controlSection()}

      <Log logMessages={logMessages} />
    </>
  );
}

export default Game;
