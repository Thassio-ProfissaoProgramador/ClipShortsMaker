import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';

let transcriber;

self.addEventListener('message', async (event) => {
  const { id, command, audio } = event.data || {};
  try {
    if (command === 'load') {
      if (!transcriber) {
        transcriber = await pipeline(
          'automatic-speech-recognition',
          'onnx-community/whisper-tiny',
          {
            dtype: 'q8',
            progress_callback: (progress) => self.postMessage({
              id,
              type: 'progress',
              file: progress.file,
              status: progress.status,
              progress: progress.progress
            })
          }
        );
      }
      self.postMessage({ id, type: 'ready' });
      return;
    }

    if (command === 'transcribe') {
      if (!transcriber) throw new Error('O modelo de fala ainda não foi carregado.');
      const output = await transcriber(new Float32Array(audio), {
        sampling_rate: 16000,
        language: 'portuguese',
        task: 'transcribe',
        return_timestamps: true,
        chunk_length_s: 20,
        stride_length_s: 4
      });
      self.postMessage({ id, type: 'transcript', output });
    }
  } catch (error) {
    self.postMessage({ id, type: 'error', message: error?.message || 'Falha na transcrição local.' });
  }
});
