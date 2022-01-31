import audioFile from "../audio-files/audio1.mp3";
// const audioFile = require("../audio-files/audio1.mp3");

//"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"

export async function getAudioBuffer(setAudioBuffer) {
  const context = new AudioContext();
  fetch(audioFile)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => setAudioBuffer(audioBuffer));
}
