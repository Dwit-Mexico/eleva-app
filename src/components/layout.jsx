// components/Layout.js
import React from 'react'
import { ImageBackground, View } from 'react-native'
import { withUniwind } from 'uniwind'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const StyledSafeAreaView = withUniwind(SafeAreaView)

function Layout({ children, className = '', edges = ['right', 'bottom', 'left'] }) {
  return (
    <SafeAreaProvider>
      <StyledSafeAreaView className={`flex-1 ${className}`} edges={edges}>
        {children}
      </StyledSafeAreaView>
    </SafeAreaProvider>
  )
}

export default Layout
