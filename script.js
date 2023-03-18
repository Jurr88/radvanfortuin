const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
canvas.width = canvasSize;
canvas.height = canvasSize;

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
    let spinDuration = Math.random() * 3 + 4; // 4 to 7 seconds
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        let easeOutCubic = (t) => --t * t * t + 1;
        let easedProgress = easeOutCubic(Math.min(progress / (spinDuration * 1000), 1));

        let deltaAngle = 10 * easedProgress;
        rotation += deltaAngle;

        drawWheel();

        if (progress < spinDuration * 1000) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            announceMovie();
        }
    }

    requestAnimationFrame(animate);
}

function announceMovie() {
    let selectedMovieIndex = Math.floor((rotation / 360) * movies.length) % movies.length;
    let selectedMovie = movies[selectedMovieIndex];
    alert(`De gekozen film is: ${selectedMovie}`);
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvasSize / 2, canvasSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    for (let i = 0; i < movies.length; i++) {
        ctx.save();
        ctx.rotate((i * 360 / movies.length) * Math.PI / 180);
        ctx.fillStyle = i % 2 === 0 ? '#666' : '#999';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, canvasSize / 2, 0, (2 * Math.PI) / movies.length);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = '16px Creepster';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.rotate(Math.PI / movies.length);
        ctx.fillText(movies[i], canvasSize / 4, 0);

        ctx.restore();
    }

    ctx.restore();

    // Draw arrow
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(canvasSize / 2 - 10, 0);
    ctx.lineTo(canvasSize / 2 + 10, 0);
    ctx.lineTo(canvasSize / 2, 20);
    ctx.closePath();
    ctx.fill();
}

drawWheel();
