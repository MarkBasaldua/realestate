const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tireSound = document.getElementById('tireSound');

const car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 100,
    speed: 0,
    maxSpeed: 10,
    friction: 0.05,
    angle: 0,
    driftAngle: 0
};

const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

function drawCar() {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.rotate(car.angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore();
}

function updateCar() {
    if (keys.up) car.speed += 0.2;
    if (keys.down) car.speed -= 0.2;

    if (keys.left) car.angle -= 0.03;
    if (keys.right) car.angle += 0.03;

    if (keys.space) {
        car.driftAngle += 0.1 * car.speed;
        tireSound.play();
    } else {
        car.driftAngle = 0;
    }

    car.speed *= (1 - car.friction);
    car.x += car.speed * Math.sin(car.angle + car.driftAngle);
    car.y -= car.speed * Math.cos(car.angle + car.driftAngle);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    updateCar();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') keys.up = true;
    if (e.code === 'ArrowDown') keys.down = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'Space') keys.space = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowUp') keys.up = false;
    if (e.code === 'ArrowDown') keys.down = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'Space') keys.space = false;
});
 
gameLoop();
 