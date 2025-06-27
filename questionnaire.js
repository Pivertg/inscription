// Liste de questions
const questions = [
     "Quel est ton pseudo discord ?",
     "Quel est ton plus haut rank en classé ?",
     "Pourquoi veux-tu faire de l'esport ?",
     "Quelle est ton objectif en voulant rejoindre l'équipe ?",
     "Quel est ton âge ?",
     "As-tu déjà participé à des matcherino ? Si oui, jusqu’à quelle manche es-tu allé ?",
     "As-tu des mate avec qui tu voudrais jouer ?",
     "Quelle sont tes disponibilités pour les entraînements ?",
     "Peux tu voc?",
     "Sur quel appareil joues-tu ?",
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
  const webhook = "https://discord.com/api/webhooks/1388094658411888751/5d3-INOwp9kqomyjQoq_nzJu7jukUJQZiTGAkD8Jd0HGgpMDfL-49T5wL7_Vi88PftNy";
  const content = questions.map((q, i) => `**${q}**\n${answers[i]}`).join('\n\n');
  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  }).then(() => {
    document.getElementById('confirmation').style.display = "";
    document.getElementById('btnSend').style.display = "none";
  });
}
