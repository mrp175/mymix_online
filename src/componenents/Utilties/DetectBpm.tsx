import { useState, useEffect } from "react";
import { getAudioBuffer } from "../../utils/loadAudio";
import { analyze, guess } from "web-audio-beat-detector";

export default function DetectBpm() {
  const [audioBuffer, setAudioBuffer] = useState<null | AudioBuffer>(null);

  async function getBpm(audioBuffer: AudioBuffer): Promise<number> {
    const bpm = await analyze(audioBuffer);
    const rounded = await guess(audioBuffer);

    console.log("the bpm is", bpm);
    console.log("the guess bpm is", rounded);
    return bpm;
  }

  useEffect(function () {
    getAudioBuffer(setAudioBuffer);
  }, []);

  useEffect(
    function () {
      if (audioBuffer) getBpm(audioBuffer);
    },
    [audioBuffer]
  );

  return null;
}
