// List of animals and their corresponding images (now in the 'images' folder)
const animals = [
  { name: 'Cat', img: 'images/cat.jpg' },
  { name: 'Dog', img: 'images/dog.jpg' },
  { name: 'Elephant', img: 'images/elephant.jpg' },
  { name: 'Lion', img: 'images/lion.jpg' },
  { name: 'Tiger', img: 'images/tiger.jpg' },
  { name: 'Monkey', img: 'images/monkey.jpg' },
  { name: 'Horse', img: 'images/horse.jpg' },
  { name: 'Bear', img: 'images/bear.jpg' },
  { name: 'Kangaroo', img: 'images/kangaroo.jpg' },
  { name: 'Penguin', img: 'images/penguin.jpg' }
];


let currentQuestionIndex = 0;
let correctAnswers = 0;

// Access audio elements
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const buttonClickSound = document.getElementById("button-click-sound");

// Shuffle the animal names for each round
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Set up the game with the current animal question
function loadQuestion() {
  const currentAnimal = animals[currentQuestionIndex];
  const shuffledAnimals = shuffle([...animals.map(a => a.name)]);

  // Set the image to match
  const imageElement = document.getElementById('image-to-match');
  imageElement.src = currentAnimal.img;

  // Display the words (shuffled list)
  const wordsContainer = document.getElementById('words-container');
  wordsContainer.innerHTML = ''; // Clear the previous options

  shuffledAnimals.forEach(word => {
    const button = document.createElement('button');
    button.textContent = word;
    button.onclick = () => checkAnswer(word, currentAnimal.name);  // No click sound here
    wordsContainer.appendChild(button);
  });

  // Hide the next question button initially
  document.getElementById('next-question').style.display = 'none';
  document.getElementById('feedback').textContent = ''; // Clear feedback
}

// Play correct answer sound
function playCorrectSound() {
  correctSound.play();
}

// Play incorrect answer sound
function playIncorrectSound() {
  incorrectSound.play();
}

// Play button click sound
function playButtonClickSound() {
  buttonClickSound.play();
}

// Check the selected answer
function checkAnswer(selectedWord, correctWord) {
  const feedback = document.getElementById('feedback');
  if (selectedWord.toLowerCase() === correctWord.toLowerCase()) {
    feedback.textContent = 'Correct! Well Done!';
    feedback.style.color = 'green';
    correctAnswers++;
    playCorrectSound();  // Play correct answer sound
  } else {
    feedback.textContent = 'Oops! Try Again.';
    feedback.style.color = 'red';
    playIncorrectSound();  // Play incorrect answer sound
  }

  // Show the "Next Question" button
  document.getElementById('next-question').style.display = 'block';
}

// Move to the next question or end the game
function nextQuestion() {
  playButtonClickSound();  // Play button click sound
  currentQuestionIndex++;
  if (currentQuestionIndex < animals.length) {
    loadQuestion();
  } else {
    showFinalGrade();
  }
}

// Show the final grade after all questions are answered
function showFinalGrade() {
  const scoreElement = document.getElementById('score');
  const percentage = (correctAnswers / animals.length) * 100;
  
  scoreElement.textContent = `You scored ${correctAnswers} out of ${animals.length} (${percentage.toFixed(2)}%)`;

  let grade = '';
  if (percentage >= 90) {
    grade = 'A';
  } else if (percentage >= 80) {
    grade = 'B';
  } else if (percentage >= 70) {
    grade = 'C';
  } else {
    grade = 'D';
  }

  scoreElement.textContent += ` Grade: ${grade}`;

  // Hide the "Next Question" button and show the "Restart Game" button
  document.getElementById('next-question').style.display = 'none';
  document.getElementById('restart-btn').style.display = 'block';
}

// Restart the game
function restartGame() {
  playButtonClickSound();  // Play button click sound
  // Reset the game variables
  currentQuestionIndex = 0;
  correctAnswers = 0;
  
  // Hide the Restart button and reset feedback
  document.getElementById('restart-btn').style.display = 'none';
  document.getElementById('feedback').textContent = '';
  document.getElementById('score').textContent = '';

  // Start the game from the first question
  loadQuestion();
}

// Initialize the game
loadQuestion();
