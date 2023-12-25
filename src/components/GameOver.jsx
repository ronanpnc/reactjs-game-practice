import React from "react";

function GameOver({ gameOverTitle, restartGame }) {
  return (
    <>
      <section className="container">
        <h2>Game Over!</h2>
        <h3>{gameOverTitle}</h3>
        <button onClick={restartGame}>NEW GAME</button>
      </section>
    </>
  );
}

export default GameOver;
