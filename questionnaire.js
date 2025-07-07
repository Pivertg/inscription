// Liste de questions
const questions = [
  "Quelle langue parles-tu ?",
  "Quel est ton pseudo discord ?",
  "Quel est ton ton record (rang) en classé ?",
  "Pourquoi veux-tu faire de l'e-sport ?",
  "Quels sont tes objectifs en rejoignant l'équipe ?",
  "Quel âge as-tu ?",
  "As-tu déjà participé à des matcherino ? Si oui, à quelle manche as-tu terminé ?",
  "Quelles sont tes disponibilités pour les entraînements ?",
  "Peux-tu voc?",
  "Sur quel type d'appareil joues-tu ?", 
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

// Import du webhook depuis webhook.js
// Assurez-vous d'inclure webhook.js AVANT questionnaire.js dans votre HTML

function sendAnswers() {
  answers[current] = document.getElementById('answerInput').value;
  // Utilise la variable du webhook importée
  const webhook = typeof DISCORD_WEBHOOK !== 'undefined' ? DISCORD_WEBHOOK : '';
  if (!webhook) {
    alert("Webhook Discord non défini !");
    return;
  }
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
