import { KeyboardAvoidingView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Routes from './src/core/routes'

export default function App() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Routes />
    </KeyboardAvoidingView>
  )
}
