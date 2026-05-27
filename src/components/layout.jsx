// components/Layout.js
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'

function Layout({ children, backgroundImage, edges = ['left', 'right'] }) {
  if (backgroundImage) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={edges}>
          <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
            {children}
          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  // Si no hay imagen de fondo, solo SafeAreaProvider y SafeAreaView
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={edges}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Layout
