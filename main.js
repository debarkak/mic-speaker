const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
let audioContext;
let microphoneStream;
let gainNode;

startButton.addEventListener('click', () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getusermedia not supported');
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      audioContext = new AudioContext();
      microphoneStream = audioContext.createMediaStreamSource(stream);
      gainNode = audioContext.createGain();
      microphoneStream.connect(gainNode);
      gainNode.connect(audioContext.destination);
      startButton.disabled = true;
      stopButton.disabled = false;
    })
    .catch((error) => {
      console.error('error accessing microphone', error);
    });
});

stopButton.addEventListener('click', () => {
  if (microphoneStream) {
    microphoneStream.disconnect();
  }
  if (gainNode) {
    gainNode.disconnect();
  }
  if (audioContext) {
    audioContext.close();
  }
  startButton.disabled = false;
  stopButton.disabled = true;
});