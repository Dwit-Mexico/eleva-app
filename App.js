import './global.css'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import Routes from './src/core/routes'

export default function App() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <StatusBar style="light" />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Routes />
      </SafeAreaProvider>
    </KeyboardAvoidingView>
  )
}
