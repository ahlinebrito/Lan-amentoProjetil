document.getElementById('launch').addEventListener('click', function() {
    const angle = parseFloat(document.getElementById('angle').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
    const height = parseFloat(document.getElementById('height').value);
    launchProjectile(angle, velocity, height);
});

function launchProjectile(angle, velocity, height) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;

    const g = 9.81; // Aceleração da gravidade (m/s^2)
    const rad = angle * Math.PI / 180; // Convertendo para radianos
    const vx = velocity * Math.cos(rad);
    const vy = velocity * Math.sin(rad);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 0;
    let y = height;
    let t = 0;

    function draw() {
        t += 0.1;
        x = vx * t;
        y = height + (vy * t - 0.5 * g * t * t);

        if (y < 0) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, canvas.height - y, 5, 0, 2 * Math.PI);
        ctx.fill();

        requestAnimationFrame(draw);
    }

    draw();
}

