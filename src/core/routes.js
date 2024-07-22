import * as React from "react";
import {KeyboardAvoidingView} from "react-native";
import {GlobalContext} from "../context/index";
import Request from "./api";

const request = new Request();

/** Navigation */
import Navigation from "../navigation/Navigation";
import {LanguageContext, useLanguage} from "../context/lang";

function Routes() {
   const {locale, setLocale, i18n} = useLanguage();
   return (
      <GlobalContext>
         <LanguageContext.Provider value={{locale, setLocale, i18n}}>
            <KeyboardAvoidingView style={{flex: 1}}>
               <Navigation />
            </KeyboardAvoidingView>
         </LanguageContext.Provider>
      </GlobalContext>
   );
}

export default Routes;
