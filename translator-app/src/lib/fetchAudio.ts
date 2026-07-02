import { getOpenTTSUrl, getVoiceIdForLanguage } from "./apiConfig";

type TTSProps = {
  text: string;
  language: string;
};
export async function fetchAudioFromTTS({ text, language }: TTSProps): Promise<Blob> {
  const ttsUrl = getOpenTTSUrl();
  const voiceId = getVoiceIdForLanguage(language);

  const response = await fetch(`${ttsUrl}/api/tts?voice=${encodeURIComponent(voiceId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: text,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TTS error ${response.status}: ${errorText}`);
  }

  const blob = await response.blob();
  return blob;
}
