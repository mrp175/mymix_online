import audioFile from "../audio-files/audio1.mp3";
import mm from "musicmetadata";

export async function getMetaData() {
  const response = await fetch(audioFile);
  const blob = await response.blob();
  const file = new File([blob], "audio1.mp3", blob);
  const parser = mm(file, function (err, metadata) {
    if (err) throw err;
    console.log(metadata);
  });
}
