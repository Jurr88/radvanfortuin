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
    let targetRotation = rotation + 10 * Math.PI + (Math.random() * 10 * Math.PI);
    let spinDuration = 5000;
    let startTimestamp = null;

    function animate(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        let progress =
