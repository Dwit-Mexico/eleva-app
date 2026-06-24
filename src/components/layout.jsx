// components/Layout.js
import React from 'react'
import { ImageBackground, View } from 'react-native'
import { withUniwind } from 'uniwind'
import { SafeAreaView } from 'react-native-safe-area-context'

const StyledSafeAreaView = withUniwind(SafeAreaView)

function Layout({ children, backgroundImage, className = '', edges = ['right', 'bottom', 'left'] }) {
  if (backgroundImage) {
    return (
      <StyledSafeAreaView className="flex-1 " edges={edges}>
        <ImageBackground source={backgroundImage} resizeMode="cover" className="flex-1">
          {children}
        </ImageBackground>
      </StyledSafeAreaView>
    )
  }

  return (
    <StyledSafeAreaView className="flex-1" edges={edges}>
      {children}
    </StyledSafeAreaView>
  )
}

export default Layout
