import { Language } from '../types';

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: 'EN', color: '#FF385C' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: 'ES', color: '#FF385C' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: 'FR', color: '#FF385C' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: 'DE', color: '#FF385C' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: 'IT', color: '#FF385C' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: 'PT', color: '#FF385C' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: 'RU', color: '#FF385C' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: 'JP', color: '#FF385C' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: 'KR', color: '#FF385C' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: 'CN', color: '#FF385C' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: 'AR', color: '#FF385C' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: 'IN', color: '#FF385C' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: 'TR', color: '#FF385C' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: 'PL', color: '#FF385C' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: 'NL', color: '#FF385C' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: 'SE', color: '#FF385C' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: 'DK', color: '#FF385C' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: 'NO', color: '#FF385C' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: 'FI', color: '#FF385C' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: 'GR', color: '#FF385C' }
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};