import i18n from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translations: {
                    LOGIN_PAGE_HEADER: "Login to your accout",
                    BACK_TO_LOGIN: "Back to login"
                }
            },
            cs: {
                translations: {
                    LOGIN_PAGE_HEADER: "Přihlašte se ke svému účtu",
                    BACK_TO_LOGIN: "Zpět na přihlášení"
                }
            }
        },
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
          escapeValue: false,
        }
    });


export default i18n;