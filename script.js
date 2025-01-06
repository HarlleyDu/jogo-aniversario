// Variáveis de controle de movimento
let player = document.getElementById('player');
let posX = 250;
let posY = 150;
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

// Função para movimentar o jogador
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

    // Aplicando desaceleração
    speedX *= friction;
    speedY *= friction;

    // Atualizando as posições
    posX += speedX;
    posY += speedY;

    // Impedindo que o jogador saia da tela
    if (posX < 0) posX = 0;
    if (posX > window.innerWidth - player.offsetWidth) posX = window.innerWidth - player.offsetWidth;
    if (posY < 0) posY = 0;
    if (posY > window.innerHeight - player.offsetHeight) posY = window.innerHeight - player.offsetHeight;

    // Atualizando as posições do jogador
    player.style.left = posX + 'px';
    player.style.top = posY + 'px';

    requestAnimationFrame(movePlayer);
}

// Iniciando a movimentação do jogador
movePlayer();

// Relógio e comemoração
const clock = document.getElementById('clock');
const message = document.getElementById('message');
const celebrationImage = document.getElementById('celebrationImage');
const celebrationLink = document.getElementById('celebrationLink');

// Função para atualizar o relógio e verificar a hora
function updateClock() {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo', hour12: false };
    const time = now.toLocaleTimeString('pt-BR', options);
    clock.textContent = time;

    if (time === '00:00:00') {
        message.style.display = 'block';
        celebrationImage.style.display = 'block';
        celebrationImage.src = 'https://media.licdn.com/dms/image/v2/D4D03AQHlO88-ekO3xg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682556629129?e=2147483647&v=beta&t=0XwmmuWyLwLsnxa_lim9pH8mYYEmvHun8YxHFml5h8k';
    } else {
        message.style.display = 'none';
        celebrationImage.style.display = 'none';
    }

    setTimeout(updateClock, 1000);
}

updateClock();

// Ação do botão de comemorar
document.getElementById('celebrationButton').addEventListener('click', () => {
    player.style.display = 'none';  // Esconde o quadrado vermelho
    message.style.display = 'block';  // Exibe a imagem da comemoração
    celebrationImage.src = 'https://media.licdn.com/dms/image/v2/D4D03AQHlO88-ekO3xg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682556629129?e=2147483647&v=beta&t=0XwmmuWyLwLsnxa_lim9pH8mYYEmvHun8YxHFml5h8k'; // Coloca a foto da Ana
});

// Código do joystick de arraste
let joystick = document.getElementById('joystick');
let joystickPad = document.getElementById('joystick-pad');
let joystickCenter = { x: joystickPad.offsetWidth / 2, y: joystickPad.offsetHeight / 2 };

let dragging = false;

joystickPad.addEventListener('mousedown', (e) => {
    dragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;

    let offsetX = e.clientX - joystickPad.getBoundingClientRect().left - joystickCenter.x;
    let offsetY = e.clientY - joystickPad.getBoundingClientRect().top - joystickCenter.y;

    // Limitar a movimentação do joystick
    let distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    if (distance > 40) {
        offsetX = (offsetX / distance) * 40;
        offsetY = (offsetY / distance) * 40;
    }

    joystickPad.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    // Movendo o jogador com base no movimento do joystick
    movePlayer();
});

document.addEventListener('mouseup', () => {
    dragging = false;
    joystickPad.style.transform = 'translate(0px, 0px)';
});
