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
  const webhook = "https://l.webhook.party/hook/yzXYx6rmSXchkLgKNEJvAdk%2BWg5hPZ78O8jFsRoI2NBdBVUQkBahclTPcVP7b1ofIrqy6Xub4S4VTpAbVFw8oe6lQZPELmq57NDVBQaO6uStiUuwohaH7MDuO696Wsojg2jdBwEJuejdwwLqPj0%2BVb151aI70afnBT3ka4eNZTMfDQlndQo66iY7qPc4M9xUSFG8AleYcCyz4kgoSZqa%2BW9ZAbCG2XFTVBnQrJnk2SBDTcbm7QKw1yCeC60yGTzNhFN4sji%2FKE3fzxhmVzOaYYYomfJSOJ8Oj%2BJsg4VMemg2NGxmtfVPiDN5%2Bk3KcRtIhaTsFMtWPrmv8mQZpJWKDVQxey7ZvfcM6xH3rFhDwQAQL91nENjlUMdzv00r5JK%2FVMTiBVOqSrg%3D/xL9J%2BSyYnSA%2FXLb7";
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
