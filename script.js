// Função para exibir o relógio e verificar a hora
function updateClock() {
    const clockElement = document.getElementById('clock');
    
    // Obtendo a hora de Brasília (fuso horário -3)
    const options = { timeZone: 'America/Sao_Paulo', hour12: true };
    const currentTime = new Date().toLocaleString('pt-BR', options); 
    
    // Atualizando o relógio na tela
    clockElement.textContent = currentTime;
    
    // Verificando se é meia-noite
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    
    if (hours === 0 && minutes === 0) {
        // Muda a imagem do personagem para o link fornecido quando for meia-noite
        document.getElementById('player').style.backgroundImage = 'url("https://media.licdn.com/dms/image/v2/D4D03AQHlO88-ekO3xg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682556629129?e=2147483647&v=beta&t=0XwmmuWyLwLsnxa_lim9pH8mYYEmvHun8YxHFml5h8k")';
        document.getElementById('player').style.backgroundSize = 'cover'; 
        document.getElementById('player').style.width = '100px';  // Ajusta o tamanho da imagem
        document.getElementById('player').style.height = '100px'; // Ajusta o tamanho da imagem
        
        // Exibindo a mensagem de feliz aniversário
        document.getElementById('birthdayMessage').textContent = "Harlley Mandou eu dizer, que você é linda, perfeita e feliz aniversário!";
        document.getElementById('birthdayMessage').style.display = "block"; // Exibindo a mensagem
    }
}

// Atualiza o relógio a cada segundo (1000ms)
setInterval(updateClock, 1000);

// Variáveis para o movimento
let player = document.getElementById('player');
let posX = 235;
let posY = 135;
let speedX = 0;
let speedY = 0;
const acceleration = 1.5; // Aceleração
const friction = 0.8; // Desaceleração

// Movimentos do jogador
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveLeft = true;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRight = true;
    }
    if (event.key === 'ArrowUp' || event.key === 'w') {
        moveUp = true;
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        moveDown = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        moveLeft = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        moveRight = false;
    }
    if (event.key === 'ArrowUp' || event.key === 'w') {
        moveUp = false;
    }
    if (event.key === 'ArrowDown' || event.key === 's') {
        moveDown = false;
    }
});

function movePlayer() {
    if (moveLeft) {
        speedX -= acceleration;
    }
    if (moveRight) {
        speedX += acceleration;
    }
    if (moveUp) {
        speedY -= acceleration;
    }
    if (moveDown) {
        speedY += acceleration;
    }

    // Aplicando a desaceleração
    speedX *= friction;
    speedY *= friction;

    // Atualizando as posições
    posX += speedX;
    posY += speedY;

    // Impedindo que o personagem saia da tela
    if (posX < 0) posX = 0;
    if (posX > window.innerWidth - player.offsetWidth) posX = window.innerWidth - player.offsetWidth;
    if (posY < 0) posY = 0;
    if (posY > window.innerHeight - player.offsetHeight) posY = window.innerHeight - player.offsetHeight;

    // Aplicando as novas posições
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    // Continuar a animação
    requestAnimationFrame(movePlayer);
}

// Iniciando a movimentação
movePlayer();
