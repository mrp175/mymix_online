export interface WaveFormDataObject {
  _channels: unknown;
  _data: DataView;
  bits: number;
  channels: number;
  duration: number;
  length: number;
  pixels_per_second: number;
  sample_rate: number;
  scale: number;
  seconds_per_pixel: number;
}
