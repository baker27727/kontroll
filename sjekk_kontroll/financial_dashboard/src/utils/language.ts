import { i18n } from "i18next";

export const getLanguage = (): string => {
    return localStorage.getItem('language') ?? 'no';
}

export const setLanguage = (instance: i18n, language: 'en' | 'no') => {
   instance.changeLanguage(language)
   localStorage.setItem('language', language)
}