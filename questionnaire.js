// Liste de questions
const questions = [
  "Quelle langue parles-tu ?",
  "Quel est ton pseudo discord ?",
  "Quel est ton ton plus gros rank en classer ?",
  "Pouquoie veux tu faire de l'e sport ?",
  "Quelle est ton objectif en voulant rejoindre l'équipe ?",
  "Quel est ton âge ?",
  "As-tu déjà participé à des matchérino ? Si oui, a tu fini a quelle manche ?",
  "As-tu des mate avec qui tu voudrais jouer ?",
  "Quelle sont tes disponibilités pour les entraînements ?",
  "Peut tu voc?",
  "Sur quelle type d'appareil joue tu ?",
];
let answers = new Array(questions.length).fill("");
let current = 0;

function showQuestion() {
  document.getElementById('questionTitle').textContent = `Question ${current + 1}`;
  document.getElementById('questionText').textContent = questions[current];
  document.getElementById('answerInput').value = answers[current] || "";
  document.getElementById('btnPrev').style.display = current === 0 ? "none" : "";
  document.getElementById('btnNext').style.display = current === questions.length - 1 ? "none" : "";
  document.getElementById('btnSend').style.display = current === questions.length - 1 ? "" : "none";
  document.getElementById('confirmation').style.display = "none";
}

document.addEventListener('DOMContentLoaded', showQuestion);

function nextQuestion() {
  answers[current] = document.getElementById('answerInput').value;
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  }
}

function prevQuestion() {
  answers[current] = document.getElementById('answerInput').value;
  if (current > 0) {
    current--;
    showQuestion();
  }
}

function sendAnswers() {
  answers[current] = document.getElementById('answerInput').value;
  // Remplace par ton URL webhook Discord
  const webhook = "https://discord.com/api/webhooks/1389559141348937748/1-4tprZ2WFjpjBerEAJqv_w2LzAxgLWz1aiB4wyaMy326VK58cFXwGFSF0zjJU1iTOXR";
  // Questions en français pour l'envoi Discord (y compris la langue)
  const questionsFR = [
    "Quelle langue parles-tu ?",
    "Quel est ton pseudo discord ?",
    "Quel est ton ton plus gros rank en classer ?",
    "Pouquoie veux tu faire de l'e sport ?",
    "Quelle est ton objectif en voulant rejoindre l'équipe ?",
    "Quel est ton âge ?",
    "As-tu déjà participé à des matchérino ? Si oui, a tu fini a quelle manche ?",
    "As-tu des mate avec qui tu voudrais jouer ?",
    "Quelle sont tes disponibilités pour les entraînements ?",
    "Peut tu voc?",
    "Sur quelle type d'appareil joue tu ?",
  ];
  // On envoie toutes les questions, y compris la langue
  const content = questionsFR.map((q, i) => `**${q}**\n${answers[i] || ''}`).join('\n\n');
  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  }).then(() => {
    document.getElementById('confirmation').style.display = "";
    document.getElementById('btnSend').style.display = "none";
  });
}
