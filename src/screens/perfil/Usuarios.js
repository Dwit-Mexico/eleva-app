import React, { useState, useEffect } from 'react'
import {
  Alert,
  FlatList,
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { Consumer } from '../../context'
import { useRoute } from '@react-navigation/native'
import Request from '../../core/api'
import Container from '../../components/container'
import BotonAccion from '../../components/boton/BotonAccion'
import CardUsuario from '../../components/usuarios/CardUsuario'
import styles from '../../styles/screens/PerfilStyle'
import Colores from '../../styles/colores'
import { useLanguageContext } from '../../context/lang'
import Layout from '../../components/layout'

const request = new Request()

function Usuarios({ navigation }) {
  const image = require('../../../assets/background.jpg')
  const { i18n } = useLanguageContext()
  const [loading, setLoading] = useState(true)
  const [usuarios, setUsuarios] = useState([])
  const [unidades, setUnidades] = useState([])

  const route = useRoute()

  async function loadUsuarios() {
    setLoading(true)
    const response = await request.get('/app/usuarios/obtener')

    if (response.error || response.empty) {
      Alert.alert(null, i18n.t('users.error'))
    }

    if (Array.isArray(response.usuarios)) {
      setUsuarios(response.usuarios)
    } else {
      Alert.alert(null, i18n.t('users.error'))
    }

    setLoading(false)
  }

  useEffect(() => {
    loadUsuarios()
  }, [])

  useEffect(() => {
    const { unidades } = route.params
    if (unidades) {
      setUnidades(unidades)
    }
  }, [route.params])

  function reload() {
    loadUsuarios()
  }

  return (
    <Layout backgrounImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <Container>
          <View style={{ marginHorizontal: 4, marginVertical: 8 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AgregarUsuario', { unidades })}
              className="bg-[#B29360] w-full h-12 rounded items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-center text-base">{i18n.t('users.add')}</Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <ActivityIndicator color={Colores.spinnerColor} size={30} />
            ) : (
              <FlatList
                data={usuarios}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={loadUsuarios.bind(this)} />}
                renderItem={card => {
                  const { item } = card
                  return <CardUsuario key={item.IdPersona} item={item} reload={reload.bind(this)} />
                }}
                keyExtractor={item => `${item.IdPersona}`}
              />
            )}
          </View>
        </Container>
      </View>
    </Layout>
  )
}

export default Consumer(Usuarios)
