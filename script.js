var context = null;
var oscillator = null;
const sequence = [
    [76, 4], [72, 4], [0, 4]
];
const length = 2;
const eps = 0.01;

function getOrCreateContext() {
    if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
    }
    return context;
}

/* set up event listeners */
document.getElementById('play').addEventListener('click', playSequence);

function playSequence() {
    getOrCreateContext();
    oscillator.start(0);
    let time = context.currentTime + eps;
    sequence.forEach(note => {
        const freq = Math.pow(2, (note[0]-69)/12)*440;
        console.log(time);
        oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
        oscillator.frequency.setTargetAtTime(freq, time, 0.001);
        time += length / note[1];
    });
}