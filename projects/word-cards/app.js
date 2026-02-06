const front = document.getElementById("frontWord");
const back = document.getElementById("backWord");
const card = document.getElementById("card");
const input = document.getElementById("answerInput");

const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const addBtn = document.getElementById("addBtn");

const wordA = document.getElementById("wordA");
const wordB = document.getElementById("wordB");

let words = JSON.parse(localStorage.getItem("words")) || [
  { a: "hello", b: "hola" },
  { a: "cat", b: "gato" }
];

let current = 0;

function showWord() {
  card.className = "card";
  input.value = "";
  front.textContent = words[current].a;
  back.textContent = words[current].b;
}

checkBtn.onclick = () => {
  const answer = input.value.trim().toLowerCase();
  const correct = words[current].b.toLowerCase();

  card.classList.add("flip");

  if (answer === correct) {
    card.classList.add("correct");
  } else {
    card.classList.add("incorrect");
  }
};

nextBtn.onclick = () => {
  current = (current + 1) % words.length;
  showWord();
};

addBtn.onclick = () => {
  if (!wordA.value || !wordB.value) return;

  words.push({
    a: wordA.value.trim(),
    b: wordB.value.trim()
  });

  localStorage.setItem("words", JSON.stringify(words));

  wordA.value = "";
  wordB.value = "";
};

showWord();

