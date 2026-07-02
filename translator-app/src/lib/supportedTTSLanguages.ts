// List of languages supported by OpenTTS
// Extracted from the OpenTTS API /voices endpoint
const SUPPORTED_TTS_LANGUAGES = new Set([
  'af', 'am', 'an', 'ar', 'as', 'az', 'be', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy',
  'da', 'de', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fr', 'fy', 'ga',
  'gd', 'gl', 'gn', 'grc', 'gu', 'ha', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'ia',
  'id', 'is', 'it', 'ja', 'jbo', 'ka', 'kk', 'kl', 'kn', 'ko', 'kok', 'ku', 'ky',
  'la', 'lfn', 'lt', 'lv', 'mi', 'mk', 'ml', 'mr', 'ms', 'mt', 'my', 'nb', 'nci',
  'ne', 'nl', 'om', 'or', 'pa', 'pap', 'pl', 'pt', 'pt-br', 'py', 'quc', 'ro',
  'ru', 'ru-lv', 'sd', 'shn', 'si', 'sk', 'sl', 'sq', 'sr', 'sv', 'sw', 'ta',
  'te', 'tn', 'tr', 'tt', 'ur', 'uz', 'vi', 'vi-vn-x-central', 'vi-vn-x-south',
  'yue', 'zh', 'zh-Hans', 'zh-Hant'
]);

export function isLanguageSupportedByTTS(languageCode: string | null): boolean {
  if (!languageCode) return false;
  
  const lowerCode = languageCode.toLowerCase();
  
  if (SUPPORTED_TTS_LANGUAGES.has(lowerCode)) {
    return true;
  }
  
  const baseCode = lowerCode.split('-')[0];
  return SUPPORTED_TTS_LANGUAGES.has(baseCode);
}
