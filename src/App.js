import React, { useState } from "react";
import { useWeb3 } from "web3-react";
import DiceGame from "../conf.json";

function App() {
  const [betAmount, setBetAmount] = useState(0);
  const [diceRoll, setDiceRoll] = useState(0);
  const [status, setStatus] = useState("");
  const { account, library } = useWeb3();

  async function rollDice() {
    setStatus("Rolling...");
    const contract = new library.eth.Contract(DiceGame.abi, DiceGame.address);
    const roll = await contract.methods.rollDice().send({ from: account, value: betAmount });
    setDiceRoll(roll);
    setStatus("Complete");
  }

  return (
      <div>
        <h1>Dice Game</h1>
        <input type="number" placeholder="Enter bet amount" onChange={(e) => setBetAmount(e.target.value)} />
        <button onClick={rollDice}>Roll Dice</button>
        <p>Dice Roll: {diceRoll}</p>
        <p>{status}</p>
      </div>
  );
}

export default App;