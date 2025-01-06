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

// Função para exibir a hora
function updateClock() {
    const now = new Date();
    const brazilTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
    const hours = brazilTime.getHours().toString().padStart(2, '0');
    const minutes = brazilTime.getMinutes().toString().padStart(2, '0');
    const seconds = brazilTime.getSeconds().toString().padStart(2, '0');
    const clockElement = document.getElementById('clock');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o relógio a cada segundo
setInterval(updateClock, 1000);

// Evento do botão de comemoração
document.getElementById('celebrationButton').addEventListener('click', function() {
    // Exibir a mensagem de comemoração e a imagem permanentemente
    const messageElement = document.getElementById('message');
    const celebrationImage = document.getElementById('celebrationImage');
    const celebrationLink = document.getElementById('celebrationLink');
    
    // Mostrar a mensagem e a imagem de comemoração
    messageElement.style.display = 'block';
    messageElement.innerHTML = "Harlley Mandou eu dizer, que você é linda, perfeita e feliz aniversário";
    
    // Substituir o quadrado vermelho pela imagem da URL
    celebrationImage.src = "https://media.licdn.com/dms/image/v2/D4D03AQHlO88-ekO3xg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682556629129?e=2147483647&v=beta&t=0XwmmuWyLwLsnxa_lim9pH8mYYEmvHun8YxHFml5h8k";
    
    // Adicionar a URL com o link de comemoração
    celebrationLink.innerHTML = 'Clique para visitar meu perfil no LinkedIn: <a href="https://www.linkedin.com/in/harlleyduarte/" target="_blank">Harlley Duarte</a>';
    
    // Substituindo o quadrado vermelho pela imagem, permanentemente
    player.style.display = 'none'; // Esconder o quadrado vermelho
});

// Controle do Joystick para celulares
document.getElementById('joystick-left').addEventListener('touchstart', function() {
    moveLeft = true;
});
document.getElementById('joystick-left').addEventListener('touchend', function() {
    moveLeft = false;
});

document.getElementById('joystick-right').addEventListener('touchstart', function() {
    moveRight = true;
});
document.getElementById('joystick-right').addEventListener('touchend', function() {
    moveRight = false;
});

document.getElementById('joystick-up').addEventListener('touchstart', function() {
    moveUp = true;
});
document.getElementById('joystick-up').addEventListener('touchend', function() {
    moveUp = false;
});

document.getElementById('joystick-down').addEventListener('touchstart', function() {
    moveDown = true;
});
document.getElementById('joystick-down').addEventListener('touchend', function() {
    moveDown = false;
});
