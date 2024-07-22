import {createContext, useState, useContext, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getLocales} from "expo-localization";
import {I18n} from "i18n-js";
import {translations} from "../../../localizations";

export const LanguageContext = createContext();

export function useLanguageContext() {
   const {locale, setLocale, i18n} = useContext(LanguageContext);

   if (!locale) {
      throw new Error(
         "useLanguageContext must be used within a LanguageContext"
      );
   }

   return {locale, setLocale, i18n};
}

export const useLanguage = () => {
   const [locale, setLocale] = useState(getLocales()[0].languageCode ?? "es");

   const i18n = new I18n(translations);
   i18n.locale = locale;
   i18n.enableFallback = true;

   useEffect(() => {
      const loadLocale = async () => {
         const locale = await AsyncStorage.getItem("locale");
         if (locale) {
            console.log("loadLocale", locale);
            setLocale(locale);
         }
      };

      loadLocale();
   }, []);

   useEffect(() => {
      i18n.locale = locale;
      console.log("useEffect", i18n.locale);
      AsyncStorage.setItem("locale", locale);
   }, [locale]);

   return {locale, setLocale, i18n};
};
