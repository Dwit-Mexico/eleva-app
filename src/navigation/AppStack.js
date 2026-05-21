import React, { useEffect } from 'react'
import { Alert, StatusBar, Platform } from 'react-native'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Consumer } from '../context'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import Request from '../core/api'
import BotonNotificaciones from '../components/boton-notificaciones/BotonNotificaciones'
import BottomNavigator from './BottomTabNavigator'
import Notificaciones from '../screens/notificaciones'
import NotificacionesDetalle from '../screens/notificaciones/detalle'
import GarantiasDetalle from '../screens/garantias/Garantias'
import NuevaGarantia from '../screens/garantias/Nueva'
import ListaReportes from '../screens/garantias/listas/Reporte'
import ListaGarantias from '../screens/garantias/listas/Garantia'
import ListaValoraciones from '../screens/garantias/listas/Valoraciones'
import ListaHistorial from '../screens/garantias/listas/Historial'
import ListaDetalleReportes from '../screens/garantias/listas/ReporteDetalle'
import DetalleGarantias from '../screens/garantias/detalle/Garantia'
import DetalleRealizado from '../screens/garantias/detalle/Realizado'
import DetalleValoraciones from '../screens/garantias/detalle/Valoraciones'
import DetalleHistorico from '../screens/garantias/detalle/Historico'
import ListaDocumentos from '../screens/documentos/ListaDocumentos'
import VistaDocumento from '../screens/documentos/documento'
import Usuarios from '../screens/perfil/Usuarios'
import AgregarUsuario from '../screens/perfil/AgregarUsuario'
import { useLanguageContext } from '../context/lang'

const request = new Request()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'reportes'

  const { i18n } = useLanguageContext()

  switch (routeName) {
    case 'perfil':
      return i18n.t('menu.profile')
    case 'reportes':
      return i18n.t('menu.customerService')
    case 'documentos':
      return i18n.t('menu.documents')
    case 'galeria':
      return i18n.t('menu.gallery')
    default:
      return i18n.t('menu.customerService')
  }
}

async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    try {
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId

      if (!projectId) {
        Alert.alert(null, 'No se ha configurado el proyecto de notificaciones')
        return
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      await request.post('/aplicacion/notificaciones/set', {
        token,
      })
    } catch (error) {
      Alert.alert(null, 'Error al registrar el dispositivo ' + error?.message || JSON.stringify(error))
    }
  } else {
    Alert.alert(null, 'Solo dispositivos fisicos pueden recibir notificaciones')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

const Stack = createStackNavigator()

function AppStack(props) {
  const { i18n } = useLanguageContext()

  useEffect(() => {
    StatusBar.setBarStyle('light-content')

    registerForPushNotificationsAsync().then()
  }, [])

  return (
    <Stack.Navigator screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={({ navigation, route }) => ({
          headerTitle: getHeaderTitle(route),
          headerRight: () => <BotonNotificaciones navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        })}
      />

      <Stack.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          headerTitle: i18n.t('screen.notifications'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="NotificacionDetalle"
        component={NotificacionesDetalle}
        options={{
          headerTitle: i18n.t('screen.notifications'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="GarantiasDetalle"
        component={GarantiasDetalle}
        options={{
          headerTitle: 'Status',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="ListaReportes"
        component={ListaReportes}
        options={{
          headerTitle: i18n.t('screen.reports'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="ListaGarantias"
        component={ListaGarantias}
        options={{
          headerTitle: i18n.t('screen.status'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="ListaValoraciones"
        component={ListaValoraciones}
        options={{
          headerTitle: i18n.t('screen.ratings'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="ListaHistorial"
        component={ListaHistorial}
        options={{
          headerTitle: i18n.t('screen.history'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="ListaDetalleReportes"
        component={ListaDetalleReportes}
        options={{
          headerTitle: 'Detalle Reporte',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="DetalleGarantia"
        component={DetalleGarantias}
        options={{
          headerTitle: i18n.t('screen.status'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="DetalleRealizado"
        component={DetalleRealizado}
        options={{
          headerTitle: 'Realizado',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="DetalleValoracion"
        component={DetalleValoraciones}
        options={{
          headerTitle: 'Valoración',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
      <Stack.Screen
        name="DetalleHistorico"
        component={DetalleHistorico}
        options={{
          headerTitle: i18n.t('screen.history'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="NuevaGarantia"
        component={NuevaGarantia}
        options={{
          headerTitle: i18n.t('screen.newReport'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="ListaDocumentos"
        component={ListaDocumentos}
        options={({ route }) => ({
          headerTitle: route.params.title.toUpperCase() || '',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        })}
      />
      <Stack.Screen
        name="VistaDocumento"
        component={VistaDocumento}
        options={({ route }) => ({
          headerTitle: route.params.title || '',
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        })}
      />

      <Stack.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          headerTitle: i18n.t('screen.users'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />

      <Stack.Screen
        name="AgregarUsuario"
        component={AgregarUsuario}
        options={{
          headerTitle: i18n.t('screen.addUser'),
          headerStyle: {
            backgroundColor: '#4C4C4C',
          },
          headerTintColor: '#B29360',
        }}
      />
    </Stack.Navigator>
  )
}

export default Consumer(AppStack)
