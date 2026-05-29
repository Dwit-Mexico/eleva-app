import './global.css'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Layout from './src/components/layout'
import Routes from './src/core/routes'

export default function App() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <StatusBar style="light" />
      <Layout>
        <Routes />
      </Layout>
    </KeyboardAvoidingView>
  )
}
