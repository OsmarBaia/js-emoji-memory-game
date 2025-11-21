const emojis = [
    "😉", "😀", "😎", "😘", "😏", "🤡", "🤯", "🤓",
    "😉", "😀", "😎", "😘", "😏", "🤡", "🤯", "🤓",
];

let openCards = [];

// Embaralhar as cartas
let shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);

// Criar as cartas no tabuleiro
for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = 'item';
    
    // Adicionar frente (emoji) e verso (escuro)
    box.innerHTML = `
        <div class="front">${shuffledEmojis[i]}</div>
        <div class="back"></div>
    `;
    
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

// Mostrar todas as cartas por 0.25s no início, depois esconder
function startGame() {
    // Todas as cartas começam mostrando os emojis (transform: rotateY(0deg))
    
    // Depois de 0.25s, gira para mostrar a face escura
    setTimeout(() => {
        const allCards = document.querySelectorAll('.item');
        allCards.forEach(card => {
            card.classList.add('hidden');
        });
    }, 1000);
}

function handleClick() {
    // Não permite clicar se já tem 2 cartas abertas ou se a carta já está combinada/aberta
    if (openCards.length >= 2 || this.classList.contains('boxOpen') || this.classList.contains('boxMatch')) {
        return;
    }
    
    // Abre a carta (mostra o emoji) - remove hidden para voltar a rotateY(0deg)
    this.classList.remove('hidden');
    this.classList.add("boxOpen");
    openCards.push(this);
    
    // Verifica se tem 2 cartas abertas
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = openCards;
    
    const emoji1 = card1.querySelector('.front').textContent;
    const emoji2 = card2.querySelector('.front').textContent;
    
    if (emoji1 === emoji2) {
        // Cartas combinam - mantém viradas (mostrando emoji)
        card1.classList.add("boxMatch");
        card2.classList.add("boxMatch");
    } else {
        // Cartas não combinam - gira de volta para face escura
        setTimeout(() => {
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            card1.classList.remove("boxOpen");
            card2.classList.remove("boxOpen");
        }, 500);
    }
    
    openCards = [];
}
// Iniciar o jogo
startGame();

// Botão reset
document.querySelector(".reset").addEventListener("click", function() {
    location.reload();
});