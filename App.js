import './global.css'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import Routes from './src/core/routes'

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar style="light" />
      <Routes />
    </SafeAreaProvider>
  )
}
