const Languages = ['Python', 'JavaScript', 'Java', 'C++', 'Ruby',
    'PHP', 'Swift', 'Kotlin', 'HTML', 'CSS', 'SQL', 'Go', 'Rust',
    'TypeScript', 'C#', 'Perl', 'MATLAB', 'R', 'Dart', 'Scala',
    'Haskell', 'Lua', 'Objective-C', 'Shell', 'Groovy', 'Visual Basic',
    'Fortran', 'COBOL', 'Julia', 'Ada'];

const Colors = ['blue', 'yellow', 'gold', 'green', 'maroon',
    'purple', 'orangered', 'plum', 'orange', 'darkblue', 'tomato', 'skyblue',
    'rosybrown', 'teal', 'forestgreen', 'darkgrey', 'greenyellow', 'dodgerblue', 'cyan',
    'darkgreen', 'navy', 'darkred', 'royalblue', 'gray', 'brown', 'magenta',
    'darkcyan', 'pink', 'lightblue', 'tan'];

document.addEventListener('DOMContentLoaded', function () {
  const introContainer = document.getElementById('introInterface');
  const gameContainer = document.getElementById('gameInterface');

  // document.getElementById('introInterface').style.display = "flex";
  // document.getElementById("introInterface").style.flex = 1;

  Languages.forEach((Language, index) => {
    const languageElement = document.createElement('p');
    languageElement.textContent = Language;
    languageElement.style.color = "#262321";
    languageElement.style.textAlign = "center";
    languageElement.style.width = "100px";
    languageElement.style.backgroundColor = Colors[index];
    introContainer.appendChild(languageElement);
  });

  setTimeout(function () {
    introContainer.style.display = 'none';
    gameContainer.style.display = 'block';
  }, 4000);
})

  let trials = 20;
  let consecutiveFailures = 0;
  let attemptNumber = 1;
  let guessedLangs = new Set();

document.getElementById('check').onclick = function () {
  document.getElementById("selectLanguage").selectedIndex = 0;
  document.getElementById("selectColor").selectedIndex = 0;
  
  const langInput = document.getElementById('selectLanguage').value;
  const colorInput = document.getElementById('selectColor').value;
  const resultDiv = document.getElementById('result');
  const submitButton = document.getElementById('check');
  const resultsTable = document.getElementById('resultsTable').querySelector('tbody');
  const part1 = document.getElementById('correctSound');
  const part2 = document.getElementById('incorrectSound');
  const part3 = document.getElementById('gameover');
  
  if (guessedLangs.has(langInput)) {
    resultDiv.textContent = "Already guessed. try another option!";
    resultDiv.style.backgroundColor = "Red";
    resultDiv.style.color = "black";
    resultDiv.style.width = "fit-content";
    resultDiv.style.textAlign = "center";
    resultDiv.style.padding = "4px, 8px";
    
    return;
  }

    guessedLangs.add(langInput);
    const index = Languages.indexOf(langInput);
    const correctColor = Colors[index];
    const row = document.createElement('tr');
    const attemptCell = document.createElement('td');
    attemptCell.textContent = attemptNumber++;
    row.appendChild(attemptCell);
    const languageCell = document.createElement('td');
    languageCell.textContent = langInput;
  
    if (index !== -1) {
      languageCell.style.backgroundColor = correctColor;
    }

    row.appendChild(languageCell);
    const resultCell = document.createElement('td');
    if (index !== -1 && correctColor === colorInput) {
      resultCell.textContent = '&checkmark;'; // Correct guess 
    }
    else {
      resultCell.textContent = '✖'; // Incorrect guess 
    }
    row.appendChild(resultCell);
    resultsTable.appendChild(row);
  
    if (trials === 0) {
      resultDiv.textContent = "Game over!";
      resultDiv.style.backgroundColor = "Red";
      resultDiv.style.color = "black";
      resultDiv.style.width = "fit-content";
      resultDiv.style.textAlign = "center";
      resultDiv.style.padding = "4px, 8px";
      submitButton.disabled = true;
      part3.play();
      endGame();

      return;
    }


    if (Languages.includes(langInput)) {
      if (correctColor === colorInput) {
        resultDiv.textContent = "Correct! Good job!";
        resultDiv.style.backgroundColor = correctColor;
        resultDiv.style.color = "black";

        consecutiveFailures = 0; // Reset consecutive failures
        part1.play();
      }
      else {
        resultDiv.textContent = "Incorrect! Try again.";
        resultDiv.style.backgroundColor = "red";

        consecutiveFailures++;
        part2.play();
      }

    }
    else {
      resultDiv.textContent = "Invalid programming language!";
      resultDiv.style.backgroundColor = "red";

      consecutiveFailures++;
      part2.play();
    }

    trials--;

    document.getElementById('gameForm').addEventListener('click', function (e) {
      e.preventDefault();
      this.reset();
    });
    
  // Check for game over conditions

    if (consecutiveFailures === 5) {
      let score = trials - consecutiveFailures;
      console.log(score);
      resultDiv.textContent = "Game over! You've failed 5 times in a row.\n" + score + "/20";
      submitButton.disabled = true;

      endGame();
    }

    else if (trials >= 20) {
      const score = trials - consecutiveFailures;
      console.log(score);
      resultDiv.textContent = "Game Over, you've reached the maximum number of trials\n" + score + "/20";
      submitButton.disabled = true;
      endGame();
    }
  };

  function endGame() {
    const score = trials - consecutiveFailures;
    console.log(score);
    resultDiv.textContent = "Game Over, you've reached the maximum number of trials\n" + score + "/20";
    const gameContainer = document.getElementById('gameDiv');
    const table = document.getElementById('resultsTable');
    gameContainer.style.display = 'none';
    table.style.display = 'block';
  };
