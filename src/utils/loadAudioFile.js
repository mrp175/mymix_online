import WaveformData from "waveform-data";
import audioFile from "../audio-files/audio1.mp3";
// const audioFile = require("../audio-files/audio1.mp3");

//"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"
const audioContext = new AudioContext();

async function GetAudio(setAudio) {
  // const [audio, setAudio] = useState(null);
  fetch(audioFile)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const options = {
        audio_context: audioContext,
        array_buffer: buffer,
        scale: 128,
      };

      return new Promise((resolve, reject) => {
        WaveformData.createFromAudio(options, (err, waveform) => {
          if (err) {
            reject(err);
          } else {
            resolve(waveform);
          }
        });
      });
    })
    .then((waveform) => {
      console.log(waveform);
      setAudio(waveform);
      // console.log(`Waveform has ${waveform.channels} channels`);
      // console.log(`Waveform has length ${waveform.length} points`);
    });
}

export default GetAudio;
