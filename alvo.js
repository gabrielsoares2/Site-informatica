const alvo = document.getElementById("alvo");
const areaDoJogo = document.getElementById("area_jogo");
const pontosEl = document.getElementById("pontos");
const objetivoInput = document.getElementById("objetivo");

let pontos = 0;
let intervalo;

// 🔹 posiciona o alvo aleatoriamente
function posicionarAlvo() {
    const areaLargura = areaDoJogo.clientWidth;
    const areaAltura = areaDoJogo.clientHeight;

    const alvoLargura = alvo.clientWidth;
    const alvoAltura = alvo.clientHeight;

    const x = Math.random() * (areaLargura - alvoLargura);
    const y = Math.random() * (areaAltura - alvoAltura);

    // animação de aparecimento
    alvo.style.animation = "none";
    alvo.offsetHeight; // força reflow
    alvo.style.animation = "aparecer 0.3s ease-out";

    alvo.style.left = `${x}px`;
    alvo.style.top = `${y}px`;
}

// 🔹 cria o +1 flutuante
function criarPontoFlutuante(x, y) {
    const ponto = document.createElement("div");
    ponto.textContent = "+1";
    ponto.classList.add("ponto-flutuante");

    ponto.style.left = `${x}px`;
    ponto.style.top = `${y}px`;

    areaDoJogo.appendChild(ponto);

    setTimeout(() => {
        ponto.remove();
    }, 800);
}

// 🔹 inicia o jogo
function iniciarJogo() {
    posicionarAlvo();

    intervalo = setInterval(() => {
        posicionarAlvo();
    }, 2000);
}

// 🔹 clique no alvo
alvo.addEventListener("click", (evento) => {
    pontos++;
    pontosEl.textContent = pontos;

    // animação da pontuação
    pontosEl.classList.remove("pontuacao-animada");
    void pontosEl.offsetWidth;
    pontosEl.classList.add("pontuacao-animada");

    // posição correta do clique dentro da área do jogo
    const rect = areaDoJogo.getBoundingClientRect();
    const x = evento.clientX - rect.left;
    const y = evento.clientY - rect.top;

    criarPontoFlutuante(x, y);

    const objetivo = parseInt(objetivoInput.value) || 10;

    if (pontos >= objetivo) {
        clearInterval(intervalo);
        alvo.style.display = "none";
        document.getElementById("vitoria").classList.remove("hidden");
        return;
    }

    posicionarAlvo();
});

document.getElementById("btn_reiniciar").addEventListener("click", () => {
    pontos = 0;
    pontosEl.textContent = 0;
    alvo.style.display = "block";

    document.getElementById("vitoria").classList.add("hidden");

    iniciarJogo();
});

// 🔹 inicia quando a página carregar
window.addEventListener("load", iniciarJogo);
