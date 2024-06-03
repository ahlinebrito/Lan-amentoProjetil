let showGrid = true; // Altere para false se não quiser a grade por padrão

function launchProjectile(angle, velocity, height) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    
    const gridSize = parseInt(document.getElementById('gridSize').value);
    canvas.width = gridSize;
    canvas.height = gridSize / 2;

    const g = 9.81; // Aceleração da gravidade (m/s^2)
    const rad = angle * Math.PI / 180; // Convertendo para radianos
    const vx = velocity * Math.cos(rad);
    const vy = velocity * Math.sin(rad);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height);
    }

    let x = 0;
    let y = height;
    let t = 0;

    const animationSpeed = parseFloat(document.getElementById('animationSpeed').value);

    function draw() {
        t += animationSpeed;
        x = vx * t;
        y = height + (vy * t - 0.5 * g * t * t);
    
        if (y < 0) {
            return;
        }
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (showGrid) {
            drawGrid(ctx, canvas.width, canvas.height);
        }
        ctx.beginPath();
        ctx.arc(x, canvas.height - y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black'; // Altere a cor aqui
        ctx.fill();
    
        requestAnimationFrame(draw);
    }

    draw();
}

function drawGrid(ctx, width, height) {
    const step = 20; // Espaçamento da grade
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'; // Cor da grade
    for (let x = 0; x <= width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        if (x % 100 === 0) { // Desenha um rótulo a cada 100 pixels
            ctx.fillText(x, x, height - 5);
        }
    }
    for (let y = 0; y <= height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        if (y % 100 === 0) { // Desenha um rótulo a cada 100 pixels
            ctx.fillText(y, 5, height - y);
        }
    }
    ctx.stroke();

    // Rótulos dos eixos
    ctx.font = "12px Inter";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillText("Distância (m)", width / 2, height - 20); // Mova o rótulo de distância para cima
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Altura (m)", -height / 2, 40); // Mova o rótulo de altura para a direita
    ctx.restore();
}


document.getElementById('launch').addEventListener('click', function() {
    const angle = parseFloat(document.getElementById('angle').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const height = parseFloat(document.getElementById('height').value);
    launchProjectile(angle, velocity, height);
});

document.getElementById('toggleGrid').addEventListener('click', function() {
    showGrid = !showGrid;
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (showGrid) {
        drawGrid(ctx, canvas.width, canvas.height);
    }
});