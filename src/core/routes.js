import * as React from 'react'
import { GlobalContext } from '../context/index'
import Request from './api'

const request = new Request()

/** Navigation */
import Navigation from '../navigation/Navigation'
import { LanguageContext, useLanguage } from '../context/lang'
import { StatusBar } from 'expo-status-bar'

function Routes() {
  const { locale, setLocale, i18n } = useLanguage()
  return (
    <GlobalContext>
      <LanguageContext.Provider value={{ locale, setLocale, i18n }}>
        <Navigation />
      </LanguageContext.Provider>
    </GlobalContext>
  )
}

export default Routes
