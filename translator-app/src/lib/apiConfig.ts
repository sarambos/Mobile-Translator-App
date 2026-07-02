import Constants from "expo-constants";

const LIBRE_TRANSLATE_PORT = 5001;
const OPEN_TTS_PORT = 5500;

function getDevelopmentHost(): string {
  const hostUri = Constants.expoConfig?.hostUri;

  if (hostUri) {
    return hostUri.split(":")[0];
  }

  return "localhost";
}

function getServiceUrl(port: number): string {
  return `http://${getDevelopmentHost()}:${port}`;
}

export function getLibreTranslateUrl(): string {
  return getServiceUrl(LIBRE_TRANSLATE_PORT);
}

export function getOpenTTSUrl(): string {
  return getServiceUrl(OPEN_TTS_PORT);
}

export function getVoiceIdForLanguage(languageCode: string): string {
  const baseCode = languageCode.toLowerCase().split("-")[0];
  return `espeak:${baseCode}`;
}