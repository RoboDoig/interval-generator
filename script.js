let context = null;
let oscillator = null;
const length = 2;
const eps = 0.01;

function getOrCreateContext() {
    if (!context) {
        context = new AudioContext();
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
        oscillator.start(0)
    }
    return context;
}

function playSequence(sequence) {
    getOrCreateContext();
    let time = context.currentTime + eps;
    // let sequence = [[parseInt(input1.value), 4], [parseInt(input2.value), 4], [0, 4]];
    sequence.forEach(note => {
        let freq = midiToFreq(note[0]);
        oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
        oscillator.frequency.setTargetAtTime(freq, time, 0.001);
        time += length / note[1];
    });
}

function midiToFreq(midiNote) {
    return Math.pow(2, (midiNote-69)/12)*440;
}

function playInputInterval() {
    let sequence = [[parseInt(input1.value), 4], [parseInt(input2.value), 4], [0, 4]];
    playSequence(sequence);
}

function playRandomInterval() {
    let min = Math.min(input1.value, input2.value);
    let max = Math.max(input1.value, input2.value);
    let note1 = Math.floor(Math.random() * (max - min) + min);
    let note2 = Math.ceil(Math.random() * (max - min) + min);
    let sequence = [[note1, 4], [note2, 4], [0, 4]];
    playSequence(sequence);
}

/* set up event listeners */
document.getElementById('play').addEventListener('click', playInputInterval);
document.getElementById('random-interval').addEventListener('click', playRandomInterval);

/*cache*/
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
