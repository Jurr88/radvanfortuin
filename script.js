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
        ctx.restore();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function spinWheel() {
    if (!spinning) {
        spinning = true;
        const targetRotation = rotation + (2 * Math.PI * (3 + Math.random() * 5));
        const spin = () => {
            if (rotation < targetRotation) {
                rotation += (targetRotation - rotation) / 20;
                drawWheel();
                requestAnimationFrame(spin);
            } else {
                spinning = false;
            }
        };
        spin();
    }
}

// Click- en touchondersteuning
canvas.addEventListener('click', spinWheel);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    spinWheel();
});

drawWheel();
