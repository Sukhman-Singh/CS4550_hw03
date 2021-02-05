import "./App.css";
import { useState } from "react";

function App() {
  const [secret, setSecret] = useState(generateRandomSecret());
  const [guesses, setGuesses] = useState([]);
  const [currGuess, setCurrGuess] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  function updateGuess(ev) {
    let input = ev.target.value;
    if (!isNaN(input)) {
      setCurrGuess(input);
    }
  }

  function makeGuess() {
    setIsInvalid(false);
    if (isGameOver) {
      return;
    }

    if (currGuess.length === 4 && uniqueNumbers(currGuess)) {
      var tempGuesses = guesses;
      tempGuesses.push(currGuess);
      setGuesses(tempGuesses);
      setCurrGuess("");
    } else {
      // input must be either less than 4 numbers
      // or non-unique numbers
      setIsInvalid(true);
      return;
    }

    // check if the player is out of guesses
    if (guesses.length >= 8) {
      setIsGameOver(true);
    }
    
    if (calcBullsCows(secret, guesses[guesses.length - 1])[0] === 4) {
      setIsGameOver(true);
    }
  }

  function uniqueNumbers(currGuess) {
    var arr = currGuess.split("");
    var set = new Set(arr);

    return set.size === 4;
  }

  function keypress(ev) {
    if (ev.key === "Enter") {
      makeGuess();
    }
  }

  function resetGame() {
    setCurrGuess("");
    setGuesses([]);
    setIsInvalid(false);
    setSecret(generateRandomSecret());
    setIsGameOver(false);
  }

  function generateRandomSecret() {
    var set = new Set([]);
    while (set.size !== 4) {
      const rand = Math.floor(Math.random() * 10);
      set.add(rand);
    }

    var secret = "";
    set.forEach(function (value) {
      secret = secret + value.toString();
    });

    return secret;
  }

  function calcBullsCows(secret, guess) {
    if (guess === undefined) {
      return "guessUndefined";
    }

    let secretChars = secret.split("");
    let guessChars = guess.split("");

    // correct number and spot
    var bulls = 0;
    // correct number, incorrect spot
    var cows = 0;

    var i;
    for (i = 0; i < secretChars.length; i++) {
      if (secretChars[i] === guessChars[i]) {
        bulls++;
      } else if (guessChars.includes(secretChars[i])) {
        cows++;
      }
    }

    return [bulls, cows];
  }

  function resultString(secret, guessNum) {
    if (guesses[guessNum - 1] === undefined) {
      return "";
    }

    const cowBullsArr = calcBullsCows(secret, guesses[guessNum - 1]);
    const bulls = cowBullsArr[0];
    const cows = cowBullsArr[1];

    return "Bulls: " + bulls + " Cows: " + cows;
  }

  function endGameText() {
    if (isGameOver) {
      if (
        guesses.length >= 8 &&
        calcBullsCows(secret, guesses[7])[0] !== 4
      ) {
        return "YOU LOST! The actual code was " + secret;
      } else {
        return "YOU WON! The code was " + secret;
      }
    } else {
      return "";
    }
  }

  return (
    <div className="App">
      <div className="reset">
        <button onClick={resetGame}>Reset</button>
      </div>

      <div id="inputArea">
        <label>Input:</label>
        <input
          id="guessInput"
          maxLength="4"
          value={currGuess}
          onChange={updateGuess}
          onKeyPress={keypress}
        />
        <button id="guess" onClick={makeGuess}>Guess</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Guess</th>
            <th>Result</th>
          </tr>
          <tr>
            <th>1</th>
            <th>{guesses[0]}</th>
            <th>{resultString(secret, 1)}</th>
          </tr>
          <tr>
            <th>2</th>
            <th>{guesses[1]}</th>
            <th>{resultString(secret, 2)}</th>
          </tr>
          <tr>
            <th>3</th>
            <th>{guesses[2]}</th>
            <th>{resultString(secret, 3)}</th>
          </tr>
          <tr>
            <th>4</th>
            <th>{guesses[3]}</th>
            <th>{resultString(secret, 4)}</th>
          </tr>
          <tr>
            <th>5</th>
            <th>{guesses[4]}</th>
            <th>{resultString(secret, 5)}</th>
          </tr>
          <tr>
            <th>6</th>
            <th>{guesses[5]}</th>
            <th>{resultString(secret, 6)}</th>
          </tr>
          <tr>
            <th>7</th>
            <th>{guesses[6]}</th>
            <th>{resultString(secret, 7)}</th>
          </tr>
          <tr>
            <th>8</th>
            <th>{guesses[7]}</th>
            <th>{resultString(secret, 8)}</th>
          </tr>
        </tbody>
      </table>
      {isInvalid && (
        <div id="errorMessage">{"Provide a valid input: 4 unique numbers"}</div>
      )}
      <div id="endGameText">{endGameText()}</div>
    </div>
  );
}

export default App;
