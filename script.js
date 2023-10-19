// Array of questions
let points = 0;
let pointsDisplay = document.getElementById('display-points');
pointsDisplay.innerText = "Points: " + points + "/99";
let rounds = 0;
let roundsDisplay = document.getElementById('display-rounds');
roundsDisplay.innerText = (7 - rounds) + " Rounds Left"
let answered = true

let checkScore = (rounds, points) => {
  if (points === 99) {
    alert('Congratulations! You have beaten ChatGPT. This time it took you ' + rounds + ' rounds. The world record is 3 rounds.');
  } else if (rounds >= 7 && points <= 99) {
    alert('GAME OVER! Unlucky! You only scored ' + points + ' points. Refresh the browser to play again.');
  } else return;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let selectedQuestion;

// Function to display the next question
function nextQuestion() {
  if (answered === false) {
    alert('You cannot go to the next question without submitting your answers.')
  } else {
  answered = false
  rounds++;
  if (rounds === 6) {
    roundsDisplay.innerText = "FINAL ROUND"
  } else {
  roundsDisplay.innerText = (7 - rounds) + " Rounds Left"
  }
  if (points >= 99) {
    alert("Congratulations! You win!");
  } else if (rounds >= 7 && points < 99) {
    alert("Game over! You lose. Refresh the browser to play again.");
  }

  if (questions.length === 0) {
    // No more questions left
    alert("Congratulations! You've completed all the questions.");
    return;
  }

  // Get a random question from the array
  const randomIndex = Math.floor(Math.random() * questions.length);
  selectedQuestion = questions[randomIndex];

  // Remove the selected question from the array
  questions.splice(randomIndex, 1);

  shuffleArray(selectedQuestion.answers);

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
    choiceElement.id = answer.rank;
    choiceElement.setAttribute("ondragstart", "drag(event)");
    choiceElement.textContent = answer.text;

    choicesContainer.appendChild(choiceElement);
  });

  // Clear other containers
  clearContainers();
} }

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

  // Adjust dimensions based on content for other containers
  const containerContent = container.querySelector('.choices-container');
  
  // Check if containerContent is not null before proceeding
  if (containerContent) {
    const containerWidth = containerContent.offsetWidth; // Add this line
    const containerHeight = containerContent.offsetHeight; // Add this line

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

    choicesContainer.appendChild(choiceElement);
  });
}

// Function to handle drag start
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function submitAnswers() {
  if (answered === true) {
    alert('Your answers have been submitted. Proceed to the next question.')
  } else {
  const runnersUp = document.getElementById('runners-up-container');
  const champion = document.getElementById('champion-container');
  if (runnersUp.childElementCount < 3) {
    alert("you must submit 3 runners up");
  } else if (champion.childElementCount < 1) {
    alert("you must submit 1 champion answer");
  } else {
    calculatePoints();
    answered = true
  }
  }
}

function calculatePoints() {
  const runnersUp = document.getElementById('runners-up-container');
  const champion = document.getElementById('champion-container');
  const choices = document.getElementById('choices-container');
  choices.childNodes.forEach((child) => {
    if (child.id == 1) {
      child.style.backgroundColor = "goldenrod";
    } else if (child.id < 5) {
      child.style.backgroundColor = "silver";
    } else {
      child.style.backgroundColor = "rgb(29, 29, 29)";
    }
  });
  runnersUp.childNodes.forEach((child) => {
    if (child.id == 1) {
      child.style.backgroundColor = "goldenrod";
      child.innerText += " " + "+5 points";
    } else if (child.id < 5) {
      child.style.backgroundColor = "silver";
      child.innerText += " " + "+5 points";
    } else {
      child.style.backgroundColor = "rgb(29, 29, 29)";
    }
  });
  champion.childNodes.forEach((child) => {
    if (child.id == 1) {
      child.style.backgroundColor = "goldenrod";
      child.innerText += " " + "+12 points";
    } else if (child.id < 5) {
      child.style.backgroundColor = "silver";
      child.innerText += " " + "+3 points";
    } else {
      child.style.backgroundColor = "rgb(29, 29, 29)";
    }
  });
  let runnersUpArray = [];
runnersUp.childNodes.forEach((child) => runnersUpArray.push(Number(child.id)))
let totalScoreArray = 0
for (let i = 0; i < runnersUpArray.length; i++) {
  totalScoreArray += runnersUpArray[i]
} 
if (totalScoreArray === 9 && Number(champion.children[0].id) === 1) {
  points += 33
  pointsDisplay.innerText = "Points: " + points + "/99"
  checkScore()
} else {
let filteredRunners = runnersUpArray.filter((rank) => rank < 5)
points += filteredRunners.length * 5
if (Number(champion.children[0].id) === 1) {
  points += 12
  pointsDisplay.innerText = "Points: " + points + "/99"
  checkScore()
} else if (Number(champion.children[0].id) < 5) {
  points += 3
  pointsDisplay.innerText = "Points: " + points + "/99"
  checkScore()
} else {
  pointsDisplay.innerText = "Points: " + points + "/99"
  checkScore()
}
if (points >= 99) {
  alert("Congratulations! You win!");
} else if (rounds >= 7 && points < 99) {
  alert("Game over! You lose. Refresh the browser to play again.");
}
}
}

const questions = [
  {
    question: "What is the best thing about Twitter?",
    answers: [
      {
        text: "Real-Time Information",
        rank: 6,
        top_answer: false,
        explanation: "Twitter excels in providing real-time information, allowing users to stay updated on news, trends, and events as they unfold. Its quick and concise format makes it a valuable source for timely updates."
      },
      {
        text: "Global Connectivity",
        rank: 2,
        top_answer: false,
        explanation: "Twitter connects people globally, breaking down geographical barriers. It facilitates communication between individuals, communities, and organizations worldwide, fostering a sense of global connectivity."
      },
      {
        text: "Engagement and Interaction",
        rank: 7,
        top_answer: false,
        explanation: "The platform encourages engagement and interaction through likes, retweets, and replies. Users can easily participate in conversations, share opinions, and connect with a diverse audience."
      },
      {
        text: "Information Sharing",
        rank: 4,
        top_answer: false,
        explanation: "Twitter serves as a powerful tool for information sharing. Users can disseminate knowledge, share insights, and contribute to discussions on various topics, making it a dynamic platform for knowledge exchange."
      },
      {
        text: "Networking Opportunities",
        rank: 8,
        top_answer: false,
        explanation: "Twitter provides networking opportunities for professionals, businesses, and individuals seeking to connect with others in their field. It's a platform for building and expanding professional networks."
      },
      {
        text: "Amplification of Voices",
        rank: 3,
        top_answer: false,
        explanation: "Twitter amplifies diverse voices and perspectives. It provides a platform for marginalized communities, activists, and individuals to share their stories and advocate for social change."
      },
      {
        text: "Hashtag Culture",
        rank: 5,
        top_answer: false,
        explanation: "The use of hashtags on Twitter has created a unique culture of organizing and categorizing discussions. Hashtags help users discover and participate in conversations on specific topics and trends."
      },
      {
        text: "Accessible News Updates",
        rank: 1,
        top_answer: true,
        explanation: "Twitter serves as a quick and accessible source for news updates. Its format allows users to follow breaking news, access diverse perspectives, and engage in conversations surrounding current events."
      }
    ]
  },
  {
    question: "What is the best thing about the internet?",
    answers: [
      {
        text: "Access to Information",
        rank: 6,
        top_answer: false,
        explanation: "One of the most appreciated aspects of the internet is its vast repository of information. It provides quick and easy access to a wealth of knowledge on virtually any topic, fostering learning and education."
      },
      {
        text: "Global Communication",
        rank: 2,
        top_answer: false,
        explanation: "The internet facilitates instant communication across the globe, connecting people from different cultures and backgrounds. This enhances interpersonal relationships, collaboration, and cultural exchange."
      },
      {
        text: "Economic Opportunities",
        rank: 7,
        top_answer: false,
        explanation: "The internet has transformed the business landscape, offering economic opportunities for entrepreneurs, startups, and established businesses. E-commerce, remote work, and online marketplaces contribute to economic growth."
      },
      {
        text: "Entertainment and Media",
        rank: 4,
        top_answer: false,
        explanation: "The internet provides a vast array of entertainment options, including streaming services, social media, and online gaming. It has revolutionized how people consume and engage with media and entertainment content."
      },
      {
        text: "Social Connection",
        rank: 8,
        top_answer: false,
        explanation: "Social media platforms and online communities enable individuals to connect with friends, family, and like-minded people. The internet fosters social interactions and helps maintain relationships across distances."
      },
      {
        text: "Innovation and Collaboration",
        rank: 3,
        top_answer: false,
        explanation: "The internet has become a hub for innovation and collaboration, allowing individuals and organizations to share ideas, collaborate on projects, and contribute to technological advancements."
      },
      {
        text: "Accessibility to Services",
        rank: 5,
        top_answer: false,
        explanation: "Online services, from banking to healthcare consultations, have improved accessibility for many. The internet makes it convenient for people to access essential services from the comfort of their homes."
      },
      {
        text: "Freedom of Expression",
        rank: 1,
        top_answer: true,
        explanation: "The internet provides a platform for freedom of expression, allowing individuals to voice their opinions, share diverse perspectives, and participate in public discourse. It plays a crucial role in fostering democracy and open dialogue."
      }
    ]
  },
  {
    question: "What is the worst thing about music?",
    answers: [
      {
        text: "Overcommercialization",
        rank: 6,
        top_answer: false,
        explanation: "Some individuals express concerns about the overcommercialization of music, where artistic expression may be compromised in favor of marketability. This can lead to a perceived decline in the authenticity of musical content."
      },
      {
        text: "Lack of Originality",
        rank: 2,
        top_answer: false,
        explanation: "Critiques of music often involve concerns about a perceived lack of originality in mainstream music. Some argue that repetitive trends and formulas contribute to a homogenized music landscape."
      },
      {
        text: "Influence on Behavior",
        rank: 7,
        top_answer: false,
        explanation: "There are concerns about the potential influence of music on behavior, particularly in relation to explicit content or messages that may be perceived as promoting negative attitudes or behaviors."
      },
      {
        text: "Loss of Artistic Depth",
        rank: 4,
        top_answer: false,
        explanation: "Critics may argue that the commercialization of music has led to a loss of artistic depth and substance. Some feel that the pursuit of commercial success often takes precedence over artistic expression and innovation."
      },
      {
        text: "Erosion of Musical Skills",
        rank: 8,
        top_answer: false,
        explanation: "The rise of technology and digital platforms has led to concerns about a potential erosion of musical skills. Some argue that auto-tuning and digital manipulation contribute to a decline in traditional musical craftsmanship."
      },
      {
        text: "Limited Diversity",
        rank: 3,
        top_answer: false,
        explanation: "Concerns about limited diversity in mainstream music involve critiques of underrepresentation of certain genres, cultures, or voices. Lack of inclusivity can lead to a less vibrant and representative musical landscape."
      },
      {
        text: "Exploitative Industry Practices",
        rank: 5,
        top_answer: false,
        explanation: "Criticism of exploitative industry practices, such as unfair compensation for artists or restrictive contracts, contributes to negative perceptions. Some argue that the music industry prioritizes profits over the well-being of musicians."
      },
      {
        text: "Subjectivity of Taste",
        rank: 1,
        top_answer: true,
        explanation: "One of the subjective aspects that some individuals find challenging is the diversity of musical tastes. What one person enjoys, another may dislike, leading to debates and disagreements about the perceived quality of music."
      }
    ]
  },
  {
    question: "What is the worst thing about immigration?",
    answers: [
      {
        text: "Strain on Resources",
        rank: 6,
        top_answer: false,
        explanation: "Some individuals believe that an influx of immigrants may strain local resources such as healthcare, education, and housing, leading to concerns about overburdened public services."
      },
      {
        text: "Cultural Tensions",
        rank: 2,
        top_answer: false,
        explanation: "Cultural tensions can arise when different cultural backgrounds come into contact. Some people may fear the dilution of their own culture or worry about the challenges of cultural integration."
      },
      {
        text: "Job Market Pressure",
        rank: 7,
        top_answer: false,
        explanation: "Concerns about increased competition for jobs can lead to fears that immigrants might take job opportunities away from native-born individuals or contribute to lower wages in certain sectors."
      },
      {
        text: "Security Concerns",
        rank: 4,
        top_answer: false,
        explanation: "Security concerns may arise due to fears of potential criminal activity or terrorism associated with immigration. However, it's important to note that the majority of immigrants are law-abiding individuals seeking a better life."
      },
      {
        text: "Social Services Overload",
        rank: 8,
        top_answer: false,
        explanation: "Worries about the strain on social services, such as welfare and healthcare systems, can contribute to negative perceptions of immigration. Some may fear that increased demand for these services could lead to budgetary challenges."
      },
      {
        text: "Integration Challenges",
        rank: 3,
        top_answer: false,
        explanation: "Concerns about the challenges of integrating newcomers into the existing social fabric, including language barriers and cultural differences, can contribute to negative attitudes towards immigration."
      },
      {
        text: "Political Divisiveness",
        rank: 5,
        top_answer: false,
        explanation: "Immigration is often a divisive political issue, with differing opinions on policies and approaches. Political debates and polarization can contribute to negative public perceptions."
      },
      {
        text: "Humanitarian Impact",
        rank: 1,
        top_answer: true,
        explanation: "Some individuals may express concerns about the humanitarian impact of immigration, especially when people are fleeing conflict or seeking refuge. Issues such as displacement and the need for humanitarian aid can elicit empathetic but often complex responses."
      }
    ]
  },
  {
    question: "What is the worst thing about text messaging?",
    answers: [
      {
        text: "Miscommunication",
        rank: 6,
        top_answer: false
      },
      {
        text: "Lack of Tone and Context",
        rank: 2,
        top_answer: false
      },
      {
        text: "Distraction",
        rank: 7,
        top_answer: false
      },
      {
        text: "Dependency on Screens",
        rank: 4,
        top_answer: false
      },
      {
        text: "Privacy Concerns",
        rank: 8,
        top_answer: false
      },
      {
        text: "Potential for Misinterpretation",
        rank: 3,
        top_answer: false
      },
      {
        text: "Overwhelm from Notifications",
        rank: 5,
        top_answer: false
      },
      {
        text: "Reduced Personal Connection",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the worst thing about war?",
    answers: [
      {
        text: "Loss of Innocent Lives",
        rank: 6,
        top_answer: false
      },
      {
        text: "Destruction of Communities",
        rank: 2,
        top_answer: false
      },
      {
        text: "Human Suffering",
        rank: 7,
        top_answer: false
      },
      {
        text: "Psychological Trauma",
        rank: 4,
        top_answer: false
      },
      {
        text: "Displacement of Families",
        rank: 8,
        top_answer: false
      },
      {
        text: "Economic Toll",
        rank: 3,
        top_answer: false
      },
      {
        text: "Political Instability",
        rank: 5,
        top_answer: false
      },
      {
        text: "Strain on Global Relations",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the worst thing about taxes?",
    answers: [
      {
        text: "Complexity",
        rank: 6,
        top_answer: false
      },
      {
        text: "High Rates",
        rank: 2,
        top_answer: false
      },
      {
        text: "Unfair Distribution",
        rank: 7,
        top_answer: false
      },
      {
        text: "Lack of Transparency",
        rank: 4,
        top_answer: false
      },
      {
        text: "Bureaucratic Hassle",
        rank: 8,
        top_answer: false
      },
      {
        text: "Limited Deductions",
        rank: 3,
        top_answer: false
      },
      {
        text: "Perceived Waste",
        rank: 5,
        top_answer: false
      },
      {
        text: "Impact on Lower Incomes",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the worst thing about politics?",
    answers: [
      {
        text: "Corruption",
        rank: 6,
        top_answer: false
      },
      {
        text: "Partisan Gridlock",
        rank: 2,
        top_answer: false
      },
      {
        text: "Lack of Transparency",
        rank: 7,
        top_answer: false
      },
      {
        text: "Political Polarization",
        rank: 4,
        top_answer: false
      },
      {
        text: "Power Abuse",
        rank: 8,
        top_answer: false
      },
      {
        text: "Misinformation",
        rank: 3,
        top_answer: false
      },
      {
        text: "Lack of Accountability",
        rank: 5,
        top_answer: false
      },
      {
        text: "Divisiveness",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the funniest type of joke?",
    answers: [
      {
        text: "Puns and Wordplay",
        rank: 6,
        top_answer: false
      },
      {
        text: "Observational Humor",
        rank: 2,
        top_answer: false
      },
      {
        text: "Self-Deprecating Jokes",
        rank: 7,
        top_answer: false
      },
      {
        text: "Situational Comedy",
        rank: 4,
        top_answer: false
      },
      {
        text: "Satire and Parody",
        rank: 8,
        top_answer: false
      },
      {
        text: "Slapstick and Physical Comedy",
        rank: 3,
        top_answer: false
      },
      {
        text: "Absurd and Surreal Humor",
        rank: 5,
        top_answer: false
      },
      {
        text: "Clever and Witty Jokes",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the best thing about food?",
    answers: [
      {
        text: "Flavor Variety",
        rank: 6,
        top_answer: false
      },
      {
        text: "Cultural Diversity",
        rank: 2,
        top_answer: false
      },
      {
        text: "Sensory Pleasure",
        rank: 7,
        top_answer: false
      },
      {
        text: "Nourishment and Sustenance",
        rank: 4,
        top_answer: false
      },
      {
        text: "Social Connection",
        rank: 8,
        top_answer: false
      },
      {
        text: "Comfort and Satisfaction",
        rank: 3,
        top_answer: false
      },
      {
        text: "Artistic Presentation",
        rank: 5,
        top_answer: false
      },
      {
        text: "Exploration of Flavors",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the best thing about nature?",
    answers: [
      {
        text: "Peace and Tranquility",
        rank: 6,
        top_answer: false
      },
      {
        text: "Beauty and Aesthetics",
        rank: 2,
        top_answer: false
      },
      {
        text: "Sense of Wonder",
        rank: 7,
        top_answer: false
      },
      {
        text: "Connection to Life",
        rank: 4,
        top_answer: false
      },
      {
        text: "Biodiversity",
        rank: 8,
        top_answer: false
      },
      {
        text: "Healing and Restoration",
        rank: 3,
        top_answer: false
      },
      {
        text: "Cycles and Rhythms",
        rank: 5,
        top_answer: false
      },
      {
        text: "Harmony and Balance",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the best thing about animals?",
    answers: [
      {
        text: "Unconditional Love",
        rank: 6,
        top_answer: false
      },
      {
        text: "Innocence",
        rank: 2,
        top_answer: false
      },
      {
        text: "Playfulness",
        rank: 7,
        top_answer: false
      },
      {
        text: "Loyalty",
        rank: 4,
        top_answer: false
      },
      {
        text: "Non-Judgmental Presence",
        rank: 8,
        top_answer: false
      },
      {
        text: "Connection to Nature",
        rank: 3,
        top_answer: false
      },
      {
        text: "Therapeutic Benefits",
        rank: 5,
        top_answer: false
      },
      {
        text: "Unique Personalities",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What do humans love about themselves the most?",
    answers: [
      {
        text: "Sense of Humor",
        rank: 6,
        top_answer: false
      },
      {
        text: "Kindness",
        rank: 2,
        top_answer: false
      },
      {
        text: "Resilience",
        rank: 7,
        top_answer: false
      },
      {
        text: "Creativity",
        rank: 4,
        top_answer: false
      },
      {
        text: "Compassion",
        rank: 8,
        top_answer: false
      },
      {
        text: "Self-Confidence",
        rank: 3,
        top_answer: false
      },
      {
        text: "Intelligence",
        rank: 5,
        top_answer: false
      },
      {
        text: "Capacity for Love",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What thing scares humans the most?",
    answers: [
      {
        text: "Death",
        rank: 6,
        top_answer: false
      },
      {
        text: "Unknown Future",
        rank: 2,
        top_answer: false
      },
      {
        text: "Failure",
        rank: 7,
        top_answer: false
      },
      {
        text: "Isolation",
        rank: 4,
        top_answer: false
      },
      {
        text: "Loss of Control",
        rank: 8,
        top_answer: false
      },
      {
        text: "Rejection",
        rank: 3,
        top_answer: false
      },
      {
        text: "Pain and Suffering",
        rank: 5,
        top_answer: false
      },
      {
        text: "Insignificance",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What motivates humans the most?",
    answers: [
      {
        text: "Personal Goals",
        rank: 6,
        top_answer: false
      },
      {
        text: "Recognition and Appreciation",
        rank: 2,
        top_answer: false
      },
      {
        text: "Sense of Purpose",
        rank: 7,
        top_answer: false
      },
      {
        text: "Desire for Success",
        rank: 4,
        top_answer: false
      },
      {
        text: "Intrinsic Passion",
        rank: 8,
        top_answer: false
      },
      {
        text: "Fear of Failure",
        rank: 3,
        top_answer: false
      },
      {
        text: "Learning and Growth",
        rank: 5,
        top_answer: false
      },
      {
        text: "Positive Impact on Others",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What makes humans the least happiest?",
    answers: [
      {
        text: "Loneliness",
        rank: 6,
        top_answer: false
      },
      {
        text: "Failure",
        rank: 2,
        top_answer: false
      },
      {
        text: "Lack of Purpose",
        rank: 7,
        top_answer: false
      },
      {
        text: "Negative Relationships",
        rank: 4,
        top_answer: false
      },
      {
        text: "Regret",
        rank: 8,
        top_answer: false
      },
      {
        text: "Financial Stress",
        rank: 3,
        top_answer: false
      },
      {
        text: "Health Issues",
        rank: 5,
        top_answer: false
      },
      {
        text: "Unfulfilled Goals",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What makes humans the happiest?",
    answers: [
      {
        text: "Connection with Others",
        rank: 6,
        top_answer: false
      },
      {
        text: "Achieving Goals",
        rank: 2,
        top_answer: false
      },
      {
        text: "Expressing Gratitude",
        rank: 7,
        top_answer: false
      },
      {
        text: "Enjoying Simple Pleasures",
        rank: 4,
        top_answer: false
      },
      {
        text: "Finding Purpose",
        rank: 8,
        top_answer: false
      },
      {
        text: "Practicing Kindness",
        rank: 3,
        top_answer: false
      },
      {
        text: "Being Present",
        rank: 5,
        top_answer: false
      },
      {
        text: "Cultivating Positive Relationships",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is humanity's favorite sense?",
    answers: [
      {
        text: "Sight",
        rank: 6,
        top_answer: false
      },
      {
        text: "Hearing",
        rank: 2,
        top_answer: false
      },
      {
        text: "Touch",
        rank: 7,
        top_answer: false
      },
      {
        text: "Taste",
        rank: 4,
        top_answer: false
      },
      {
        text: "Smell",
        rank: 8,
        top_answer: false
      },
      {
        text: "Balance (Vestibular)",
        rank: 3,
        top_answer: false
      },
      {
        text: "Proprioception",
        rank: 5,
        top_answer: false
      },
      {
        text: "Interoception",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the best thing about drawing?",
    answers: [
      {
        text: "Creative Expression",
        rank: 6,
        top_answer: false
      },
      {
        text: "Stress Relief",
        rank: 2,
        top_answer: false
      },
      {
        text: "Sense of Accomplishment",
        rank: 7,
        top_answer: false
      },
      {
        text: "Visual Communication",
        rank: 4,
        top_answer: false
      },
      {
        text: "Enhanced Focus",
        rank: 8,
        top_answer: false
      },
      {
        text: "Self-Discovery",
        rank: 3,
        top_answer: false
      },
      {
        text: "Improving Skills",
        rank: 5,
        top_answer: false
      },
      {
        text: "Unleashing Imagination",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What's the best thing about taking photographs?",
    answers: [
      {
        text: "Capturing Memories",
        rank: 6,
        top_answer: false
      },
      {
        text: "Creative Expression",
        rank: 2,
        top_answer: false
      },
      {
        text: "Documenting Life Events",
        rank: 7,
        top_answer: false
      },
      {
        text: "Sharing Experiences",
        rank: 4,
        top_answer: false
      },
      {
        text: "Preserving Moments in Time",
        rank: 8,
        top_answer: false
      },
      {
        text: "Connecting with Others",
        rank: 3,
        top_answer: false
      },
      {
        text: "Exploring Perspectives",
        rank: 5,
        top_answer: false
      },
      {
        text: "Enhancing Creativity",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What's the best thing about journaling?",
    answers: [
      {
        text: "Self-Reflection",
        rank: 6,
        top_answer: false
      },
      {
        text: "Emotional Release",
        rank: 2,
        top_answer: false
      },
      {
        text: "Clarity of Thoughts",
        rank: 7,
        top_answer: false
      },
      {
        text: "Personal Growth",
        rank: 4,
        top_answer: false
      },
      {
        text: "Stress Reduction",
        rank: 8,
        top_answer: false
      },
      {
        text: "Goal Setting",
        rank: 3,
        top_answer: false
      },
      {
        text: "Creativity Boost",
        rank: 5,
        top_answer: false
      },
      {
        text: "Record of Memories",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What's the best thing about humour?",
    answers: [
      {
        text: "Stress Relief",
        rank: 6,
        top_answer: false
      },
      {
        text: "Connection with Others",
        rank: 2,
        top_answer: false
      },
      {
        text: "Mood Elevation",
        rank: 7,
        top_answer: false
      },
      {
        text: "Coping Mechanism",
        rank: 4,
        top_answer: false
      },
      {
        text: "Enhanced Creativity",
        rank: 8,
        top_answer: false
      },
      {
        text: "Increased Resilience",
        rank: 3,
        top_answer: false
      },
      {
        text: "Improved Relationships",
        rank: 5,
        top_answer: false
      },
      {
        text: "Perspective Shift",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What is the best thing about faith in God?",
    answers: [
      {
        text: "Sense of Purpose",
        rank: 4,
        top_answer: false
      },
      {
        text: "Comfort in Hard Times",
        rank: 7,
        top_answer: false
      },
      {
        text: "Community Support",
        rank: 2,
        top_answer: false
      },
      {
        text: "Hope for the Future",
        rank: 6,
        top_answer: false
      },
      {
        text: "Guidance in Decision-Making",
        rank: 8,
        top_answer: false
      },
      {
        text: "Inner Peace",
        rank: 3,
        top_answer: false
      },
      {
        text: "Connection to Something Greater",
        rank: 5,
        top_answer: false
      },
      {
        text: "Morality and Ethics",
        rank: 1,
        top_answer: true
      }
    ]
  },
  {
    question: "What are humanity's least favorite characteristics of their partners?",
    answers: [
      {
        text: "Dishonesty",
        rank: 6,
        top_answer: false
      },
      {
        text: "Lack of Communication",
        rank: 2,
        top_answer: false
      },
      {
        text: "Selfishness",
        rank: 7,
        top_answer: false
      },
      {
        text: "Lack of Empathy",
        rank: 4,
        top_answer: false
      },
      {
        text: "Disrespect",
        rank: 8,
        top_answer: false
      },
      {
        text: "Different Values",
        rank: 3,
        top_answer: false
      },
      {
        text: "Unreliability",
        rank: 5,
        top_answer: false
      },
      {
        text: "Lack of Support",
        rank: 1,
        top_answer: true
      }
    ]
  }
];

nextQuestion()