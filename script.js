const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const movies = [
    'The Tunnel',
    'Jeruzalem',
    'As Above, So Below',
    'Afflicted',
    'Pyramid',
    'Evil Dead Remake',
    'Skinamarink',
    'Creep',
    'Man bites dog',
    'REC',
];

let rotation = 0;
let spinning = false;

canvas.addEventListener('click', () => {
    if (!spinning) {
        spinning = true;
        spinWheel();
    }
});

function spinWheel() {
    let targetRotation = rotation + 5 * Math.PI + (Math.random() * 5 * Math.PI);
    let spinDuration = 10000; // Verleng de draaitijd voor meer spanning
    let startTimestamp = null;

    function animate(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        let progress = timestamp - startTimestamp;
        let easeOutCubic = t => (--t) * t * t + 1;

        rotation += (targetRotation - rotation) * easeOutCubic(progress / spinDuration);

        if (progress < spinDuration) {
            requestAnimationFrame(animate);
        } else {
            rotation = targetRotation;
            spinning = false;
            announceSelectedMovie(); // Toon de geselecteerde film
        }
    }

    requestAnimationFrame(animate);
}

function announceSelectedMovie() {
    let selectedMovieIndex = Math.floor(((rotation % (2 * Math.PI)) / (2 * Math.PI)) * movies.length);
    alert('Gefeliciteerd! De geselecteerde film is: ' + movies[selectedMovieIndex]);
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);

    for (let i = 0; i < movies.length; i++) {
        ctx.save();
        ctx.rotate((2 * Math.PI * i) / movies.length);
        ctx.fillStyle = i % 2 === 0 ? '#f00' : '#0f0';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, canvas.width / 2, 0, (2 * Math.PI) / movies.length);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.closePath();

        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 14px 'Creepster', cursive"; // Gebruik een enger lettertype
        ctx.rotate(((2 * Math.PI) / movies.length) / 2);
        ctx.fillText(movies[i], canvas.width / 4, 0);

        ctx.restore();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}
}

function gameLoop() {
    drawWheel();
    requestAnimationFrame(gameLoop);
}

gameLoop();
