// components/Layout.js
import React from 'react'
import { ImageBackground, View } from 'react-native'
import { withUniwind } from 'uniwind'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

const StyledSafeAreaView = withUniwind(SafeAreaView)

function Layout({ children, backgroundImage, edges = ['left', 'right'] }) {
  if (backgroundImage) {
    return (
      <SafeAreaProvider>
        <StyledSafeAreaView className="flex-1" edges={edges}>
          <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1">
            {children}
          </ImageBackground>
        </StyledSafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <StyledSafeAreaView className="flex-1" edges={edges}>
        {children}
      </StyledSafeAreaView>
    </SafeAreaProvider>
  )
}

export default Layout
