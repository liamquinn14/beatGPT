// Array of questions
const questions = [
  {
    question: "Rank the following 8 best things to do in Las Vegas in order of enjoyment.",
    answers: [
      {
        text: "Explore the Las Vegas Strip",
        rank: 1,
        top_answer: true
      },
      {
        text: "Visit the Bellagio Fountains",
        rank: 2,
        top_answer: false
      },
      {
        text: "Experience a Cirque du Soleil Show",
        rank: 3,
        top_answer: false
      },
      {
        text: "Go to a Top-notch Buffet",
        rank: 4,
        top_answer: false
      },
      {
        text: "Catch a Live Music Show",
        rank: 5,
        top_answer: false
      },
      {
        text: "Visit the High Roller Observation Wheel",
        rank: 6,
        top_answer: false
      },
      {
        text: "Try Your Luck at Casinos",
        rank: 7,
        top_answer: false
      },
      {
        text: "Explore the Neon Museum",
        rank: 8,
        top_answer: false
      }
    ]
  },
  {
    question: "Rank the following 8 worst things to put in the washing machine in order of how damaging they are.",
    answers: [
      {
        text: "Wet Clothes",
        rank: 7,
        top_answer: false
      },
      {
        text: "Pet Bedding with Hair",
        rank: 6,
        top_answer: false
      },
      {
        text: "Red Items with Whites",
        rank: 5,
        top_answer: false
      },
      {
        text: "Heavy Blankets",
        rank: 8,
        top_answer: false
      },
      {
        text: "Shoes",
        rank: 4,
        top_answer: false
      },
      {
        text: "Delicate Lace",
        rank: 2,
        top_answer: false
      },
      {
        text: "Dry-Clean Only Items",
        rank: 1,
        top_answer: true
      },
      {
        text: "Electronics",
        rank: 3,
        top_answer: false
      }
    ]
  }
  // Add more questions as needed
];

// Function to display the next question
function nextQuestion() {
  // Get a random question from the array
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selectedQuestion = questions[randomIndex];

  // Update the question display
  const questionDisplay = document.getElementById("question-text");
  questionDisplay.innerText = selectedQuestion.question;

  // Update the answer choices
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = ''; // Clear previous choices

  selectedQuestion.answers.forEach((answer, index) => {
    const choiceElement = document.createElement("div");
    choiceElement.className = "choice";
    choiceElement.draggable = true; // Make the choice draggable
    choiceElement.id = "choice" + (index + 1);
    choiceElement.setAttribute("ondragstart", "drag(event)");
    choiceElement.textContent = answer.text;

    choicesContainer.appendChild(choiceElement);
  });

  // Clear other containers
  clearContainers();
}

// Function to clear answer containers
function clearContainers() {
  // Clear content, not labels
  document.getElementById("champion-container").innerHTML = '';
  document.getElementById("runners-up-container").innerHTML = '';
}

// Function to handle drop for Champion Answer
function dropChampion(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const championContainer = document.getElementById("champion-container");

  if (championContainer.children.length === 1) {
    alert("You can only select one champion answer");
  } else {
    championContainer.appendChild(draggedElement);
    adjustContainerDimensions("champion-container", true);
  }
}

// Function to handle drop for Runners Up
function dropRunnersUp(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const runnersUpContainer = document.getElementById("runners-up-container");
  if (runnersUpContainer.children.length < 3) {
    runnersUpContainer.appendChild(draggedElement);
    adjustContainerDimensions("runners-up-container");
  } else {
    alert("You can only select three runners up");
  }
}

// Function to handle drop for Answer Choices
function dropChoices(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const choicesContainer = document.getElementById("choices-container");

  choicesContainer.appendChild(draggedElement);
  adjustContainerDimensions("choices-container");
}

// Function to allow drop
function allowDrop(event) {
  event.preventDefault();
}

// Function to adjust container dimensions based on content
function adjustContainerDimensions(containerId, isCircle = false) {
  const container = document.getElementById(containerId);
  const containerContent = container.querySelector('.choices-container');
  const containerWidth = containerContent.offsetWidth + 40; // Add some padding
  const containerHeight = containerContent.offsetHeight + 40; // Add some padding

  if (containerId === "champion-container") {
    // Set a fixed size for the champion answer container
    container.style.width = '150px';
    container.style.height = '150px';
  } else {
    // Adjust dimensions based on content for other containers
    container.style.width = isCircle ? containerHeight + 'px' : containerWidth + 'px';
    container.style.height = isCircle ? containerWidth + 'px' : containerHeight + 'px';
  }
}

// Initialize the answer choices
const answerChoices = ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5", "Choice 6", "Choice 7", "Choice 8"];
createAnswerChoices();

// Function to dynamically create answer choice elements
function createAnswerChoices() {
  const choicesContainer = document.getElementById("choices-container");

  answerChoices.forEach((choice, index) => {
    const choiceElement = document.createElement("div");
    choiceElement.className = "choice";
    choiceElement.draggable = true; // Make the choice draggable
    choiceElement.id = "choice" + (index + 1);
    choiceElement.setAttribute("ondragstart", "drag(event)");
    choiceElement.textContent = choice;

    choicesContainer.appendChild(choiceElement);
  });
}

// Function to handle drag start
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}
