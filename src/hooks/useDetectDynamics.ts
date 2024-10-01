import { Subject } from 'rxjs';

const dynamicStream = new Subject<number>();
export const useDetectDynamics = () => {
  function beginListening(navigator: Navigator) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        source.connect(analyser);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function getAverageVolume() {
          analyser.getByteFrequencyData(dataArray);
          const arraySum = dataArray.reduce((a, value) => a + value, 0);
          const average = arraySum / bufferLength;
          return average;
        }

        setInterval(() => {
          const volume = getAverageVolume();
          dynamicStream.next(volume);
        }, 10);
      })
      .catch((err) => {
        dynamicStream.error(err);
      });
  }

  return {
    beginListening,
    dynamicStream,
  };
};
