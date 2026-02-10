const words = [
  "teclado",
  "mouse",
  "computador",
  "programação",
  "internet",
  "javascript"
];

const phrases = [
  "O mouse é um hardware utilizado para interagir com o computador",
  "O teclado permite digitar textos e comandos no sistema",
  "Hardware são as peças físicas do computador",
  "Software são os programas instalados no computador",
  "O Windows é um sistema operacional da Microsoft",
  "O Windows 11 é a versão mais recente do sistema Windows",
  "O processador é responsável por executar os cálculos do sistema",
  "A memória RAM armazena dados temporários dos programas",
  "O disco rígido armazena arquivos e programas",
  "O SSD é mais rápido que o HD tradicional",
  "A placa mãe conecta todos os componentes do computador",
  "A internet permite a comunicação entre computadores",
  "O navegador é usado para acessar sites na internet",
  "O Google Chrome é um navegador bastante utilizado",
  "O computador precisa de energia elétrica para funcionar",
  "O sistema operacional gerencia os recursos do computador",
  "Um arquivo é um conjunto de informações armazenadas",
  "Uma pasta serve para organizar arquivos",
  "O monitor exibe as informações do computador",
  "O computador é uma ferramenta essencial no dia a dia"
];

let gameMode = "words";
const GAME_TIME = 900;

let remainingWords = [];
let remainingPhrases = [];

const accentMap = {
  "á": ["´", "a"],
  "é": ["´", "e"],
  "í": ["´", "i"],
  "ó": ["´", "o"],
  "ú": ["´", "u"],

  "â": ["^", "a"],
  "ê": ["^", "e"],
  "ô": ["^", "o"],

  "ã": ["~", "a"],
  "õ": ["~", "o"],

  "ç": ["ç"]
};

const keyboardEl = document.getElementById("keyboard");

const keyboardLayout = [
  ["'","1","2","3","4","5","6","7","8","9","0","-","=","backspace"],
  ["tab","q","w","e","r","t","y","u","i","o","p","´","["],
  ["caps","a","s","d","f","g","h","j","k","l","ç","~","]"],
  ["shift","z","x","c","v","b","n","m",",",".",";","shift"],
  ["ctrl","alt","space","altgr","ctrl"]
];

const shiftMap = {
  "1": "!",
  "2": "@",
  "3": "#",
  "4": "$",
  "5": "%",
  "6": "¨",
  "7": "&",
  "8": "*",
  "9": "(",
  "0": ")",

  "-": "_",
  "=": "+",

  "'": '"',
  "´": "`",
  "~": "^",

  ",": "<",
  ".": ">",
  ";": ":",
  "/": "?"
};

let typingGameActive = false;
let timer = null;

function startTypingGame() {
  // Estado
  typingGameActive = true;

  // Reset valores
  score = 0;
  time = GAME_TIME;
  combo = 0;

  scoreEl.textContent = "0";
  timeEl.textContent = GAME_TIME;
  progress.style.width = "100%";

  comboEl.classList.add("hidden");
  input.disabled = false;
  input.value = "";

  document.getElementById("typingGameOver").classList.add("hidden");

  // Segurança total
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  renderKeyboard();
  newWord();
  highlightNextKey();

  timer = setInterval(countdown, 1000);
}

function getNextItem() {
  if (gameMode === "words") {
    if (remainingWords.length === 0) {
      remainingWords = [...words];
    }

    const index = Math.floor(Math.random() * remainingWords.length);
    return remainingWords.splice(index, 1)[0];
  }

  if (remainingPhrases.length === 0) {
    remainingPhrases = [...phrases];
  }

  const index = Math.floor(Math.random() * remainingPhrases.length);
  return remainingPhrases.splice(index, 1)[0];
}


function getNextPhrase() {
  if (remainingPhrases.length === 0) {
    remainingPhrases = [...phrases];
  }

  const index = Math.floor(Math.random() * remainingPhrases.length);
  return remainingPhrases.splice(index, 1)[0];
}


function renderKeyboard() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`row${i}`).innerHTML = "";
    }

  keyboardLayout.forEach((row, rowIndex) => {
    row.forEach(key => {
      const keyEl = document.createElement("div");
      keyEl.classList.add("key");
      keyEl.dataset.key = key;

        if (key === "space") keyEl.textContent = "␣";
        else if (key === "backspace") keyEl.textContent = "⌫";
        else keyEl.textContent = key;

        if (["shift","ctrl","alt","altgr","caps","tab","backspace"].includes(key)) {
        keyEl.classList.add("special");
        }


      document.getElementById(`row${rowIndex + 1}`).appendChild(keyEl);

      if (key === "caps" && capsActive) {
        keyEl.classList.add("active");
    }

    });
  });
}

let shiftActive = false;
let capsActive = false;

function updateCapsVisual() {
  const capsKey = document.querySelector('.key[data-key="caps"]');
  if (!capsKey) return;

  capsKey.classList.toggle("active", capsActive);

  // Atualiza apenas letras
  document.querySelectorAll(".key").forEach(keyEl => {
    const baseKey = keyEl.dataset.key;

    if (!baseKey || baseKey.length !== 1) return;
    if (!baseKey.match(/[a-z]/i)) return;

    if (capsActive && !shiftActive) {
      keyEl.textContent = baseKey.toUpperCase();
    } 
    else if (!capsActive && !shiftActive) {
      keyEl.textContent = baseKey.toLowerCase();
    }
  });
}


document.addEventListener("keydown", (e) => {

  // SHIFT
  if (e.key === "Shift") {
    shiftActive = true;
    updateKeyboardKeys();
    document.querySelectorAll('.key[data-key="shift"]').forEach(k => k.classList.add("active"));
  }

  // CAPS LOCK
  if (e.key === "CapsLock") {
    capsActive = !capsActive;
    updateKeyboardKeys();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Shift") {
    shiftActive = false;
    updateKeyboardKeys();
    document.querySelectorAll('.key[data-key="shift"]').forEach(k => k.classList.remove("active"));
  }

  capsActive = e.getModifierState("CapsLock");

  updateCapsVisual();
});

function updateKeyboardKeys() {
  document.querySelectorAll(".key").forEach(keyEl => {
    const baseKey = keyEl.dataset.key;
    if (!baseKey) return;

    // Ignora teclas especiais
    if (["shift","ctrl","alt","altgr","caps","tab","backspace","space"].includes(baseKey)) {
      return;
    }

    // 🔤 LETRAS
    if (/^[a-z]$/i.test(baseKey)) {

      // Caps XOR Shift (comportamento real)
      const upper = capsActive ^ shiftActive;
      keyEl.textContent = upper ? baseKey.toUpperCase() : baseKey.toLowerCase();
      return;
    }

    // 🔢 SÍMBOLOS / NÚMEROS
    if (shiftActive && shiftMap[baseKey]) {
      keyEl.textContent = shiftMap[baseKey];
    } else {
      keyEl.textContent = baseKey;
    }
  });
}



function highlightNextKey() {
  document.querySelectorAll(".key").forEach(k => {
    k.classList.remove("next");
  });

  const nextChar = currentWord[input.value.length];
  if (!nextChar) return;

  let keysToHighlight = [];

  // 🔤 Maiúscula → precisa de Shift
  if (nextChar === nextChar.toUpperCase() && nextChar.match(/[A-Z]/)) {
    keysToHighlight.push("shift");
    keysToHighlight.push(nextChar.toLowerCase());
  }

  // 🔡 Acentos
  else if (accentMap[nextChar]) {
    accentMap[nextChar].forEach(k => keysToHighlight.push(k));
  }

  // 🔠 Letra normal
  else {
    keysToHighlight.push(nextChar.toLowerCase());
  }

  // 🎯 Destacar todas as teclas necessárias
  keysToHighlight.forEach(key => {
    const keyEl = document.querySelector(`.key[data-key="${key}"]`);
    if (keyEl) {
      keyEl.classList.add("next");
    }
  });
}




let currentWord = "";
let score = 0;
let time = GAME_TIME;
let combo = 0;

const comboEl = document.getElementById("combo");
const wordDisplay = document.getElementById("wordDisplay");
const input = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

// 🔠 Gera nova palavra
function newWord() {
  currentWord = getNextItem();
  input.value = "";
  renderWord();
}


// 🎨 Renderiza letras com feedback visual
function renderWord() {
  wordDisplay.innerHTML = "";

  currentWord.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.classList.add("letter");

    if (input.value[index] === char) {
      span.classList.add("correct");
    } else if (input.value[index]) {
      span.classList.add("wrong");
    }

    wordDisplay.appendChild(span);
  });
}

// ⌨️ Digitação
input.addEventListener("input", () => {
    highlightNextKey();
    renderWord();

    const lastChar = input.value.slice(-1).toLowerCase();
    const keyEl = document.querySelector(`.key[data-key="${lastChar}"]`);

    if (keyEl) {
    keyEl.classList.remove("correct", "wrong");
    }

    const typed = input.value;

  // ERRO
  if (!currentWord.startsWith(typed)) {
    feedback.textContent = "Erro ❌";
    feedback.style.color = "#ff4d4d";
    input.classList.add("error");

    combo = 0;
    comboEl.classList.add("hidden");
    
    if (keyEl) {
        keyEl.classList.add("wrong");
    }

    renderWord();
    highlightNextKey();
    return;

  }

  input.classList.remove("error");
  feedback.textContent = "";

  // ACERTO COMPLETO
  if (typed === currentWord) {
    score++;
    scoreEl.textContent = score;

    combo++;
    comboEl.textContent = `🔥 Combo x${combo}`;
    comboEl.classList.remove("hidden");

    comboEl.style.animation = "none";
    comboEl.offsetHeight;
    comboEl.style.animation = "comboPop 0.3s ease";

    feedback.textContent = "Boa! ✅";
    feedback.style.color = "#00ffcc";

    setTimeout(() => {
    document.querySelectorAll(".key").forEach(k => {
        k.classList.remove("correct", "wrong");
    });
    }, 100);

    newWord();
    highlightNextKey();
    return;
  }

  renderWord();
});

const modeWordsBtn = document.getElementById("modeWords");
const modePhrasesBtn = document.getElementById("modePhrases");

modeWordsBtn.addEventListener("click", () => {
  gameMode = "words";

  modeWordsBtn.classList.add("active");
  modePhrasesBtn.classList.remove("active");

  remainingWords = [...words];
  newWord();
});

modePhrasesBtn.addEventListener("click", () => {
  gameMode = "phrases";

  modePhrasesBtn.classList.add("active");
  modeWordsBtn.classList.remove("active");

  remainingPhrases = [...phrases];
  newWord();
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ⏱️ Cronômetro
function countdown() {
  if (!typingGameActive) return;

  time--;
  timeEl.textContent = formatTime(time);
  progress.style.width = (time / GAME_TIME) * 100 + "%";

  if (time <= 0 && typingGameActive) {
  typingGameActive = false;

  clearInterval(timer);
  timer = null;

  input.disabled = true;

  document.getElementById("finalScore").textContent = score;
  document.getElementById("typingGameOver").classList.remove("hidden");
}
}


document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);

  if (keyEl) {
    keyEl.classList.add("pressed");
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  const keyEl = document.querySelector(`.key[data-key="${key}"]`);

  if (keyEl) {
    keyEl.classList.remove("pressed");
  }
});

document.getElementById("typingGameOver").classList.add("hidden");


document.getElementById("typingResetBtn").addEventListener("click", () => {
  startTypingGame();
});

startTypingGame();
setTimeout(() => {
  capsActive = window.getModifierState?.("CapsLock") || false;
  updateCapsVisual();
}, 100);