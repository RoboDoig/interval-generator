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

function playSequence() {
    getOrCreateContext();
    let time = context.currentTime + eps;
    let sequence = [[parseInt(input1.value), 4], [parseInt(input2.value), 4], [0, 4]];
    sequence.forEach(note => {
        let freq = midiToFreq(note[0]);
        oscillator.frequency.setTargetAtTime(0, time - eps, 0.001);
        oscillator.frequency.setTargetAtTime(freq, time, 0.001);
        time += length / note[1];
    });
    console.log(parseInt(input1.value));
}

function midiToFreq(midiNote) {
    return Math.pow(2, (midiNote-69)/12)*440;
}

/* set up event listeners */
document.getElementById('play').addEventListener('click', playSequence);

/*cache*/
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
