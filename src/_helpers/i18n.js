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
                    "Email": "Email",
                    "Username": "Username",
                    "Password": "Password",
                    REGISTRATION_KEY: "Create new account",
                    LOGIN_PAGE_HEADER: "Login to your accout",
                    BACK_TO_LOGIN: "Back to login.",
                    REGISTRATION_LINK: "Don't have account yet, create a new one."
                }
            },
            cs: {
                translations: {
                    "Email": "Email",
                    "Username": "Uživatelské jméno",
                    "Password": "Heslo",
                    "Language": "Jazyk",
                    "English": "Angličtina",
                    "Czech": "Čeština",
                    "Username or email": "Uživatelské jméno nebo email",
                    "Register": "Registrovat",
                    "Login": "Přihlásit",
                    "Username or password mismatch.": "Nesprávné uživatelské jméno nebo heslo.",
                    "Username or email is required.": "Je nutné vyplnit uživatelké jméno nebo email.",
                    "Password is required.": "Je nutné vyplnit heslo.",
                    REGISTRATION_KEY: "Vytvořit nový účet",
                    LOGIN_PAGE_HEADER: "Přihlašte se ke svému účtu",
                    BACK_TO_LOGIN: "Zpět na přihlášení.",
                    REGISTRATION_LINK: "Ještě nemáte účet? Založte si nový."
                }
            }
        },
        fallbackLng: "en",
        debug: false,

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
          escapeValue: false,
        }
    });

export { i18n };