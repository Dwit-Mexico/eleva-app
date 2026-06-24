import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, ImageBackground, Image, Modal, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Consumer } from '../../../context'
import { FontAwesome5, Feather } from '@expo/vector-icons'
import Container from '../../../components/container'
import ZoomableImage from '../../../components/common/ZoomableImage'
import Styles from '../../../styles/screens/DetalleStyle'
import Colores from '../../../styles/colores'
import { useLanguageContext } from '../../../context/lang'
import Layout from '../../../components/layout'

const Historico = ({ context }) => {
  const image = require('../../../../assets/background2.jpg')
  const { i18n, locale } = useLanguageContext()
  const route = useRoute()
  const navigation = useNavigation()
  const [info, setInfo] = useState({})
  const [respuesta, setRespuesta] = useState(null)
  const [comentario, setComentario] = useState('')
  const [valoracion, setValoracion] = useState(5)
  const [loading, setLoading] = useState(false)
  const [modalImagen, setModalImagen] = useState(false)
  const [zoomImagen, setZoomImagen] = useState(null)

  useEffect(() => {
    const { data } = route.params
    if (data) {
      setInfo(data)
      setRespuesta(data.Reparado || null)
      setComentario(data.ComentarioReparacion || '')
      setValoracion(data.Valoracion || 5)
    }
  }, [route.params])

  const ImagenButton = ({ navigation, index, imagen }) => {
    const EmptyImage = require('../../../../assets/picture.jpg')

    return (
      <View style={styles.imagenButtonContainer}>
        <TouchableOpacity onPress={() => _openCamara(navigation, index, imagen)}>
          <Image source={imagen || EmptyImage} style={styles.imagenButtonImage} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    )
  }

  function _openCamara(navigation, index, imagen) {
    if (imagen) {
      setModalImagen(true)
      setZoomImagen(imagen)
      return
    }
  }

  return (
    <Layout backgroundImage={image}>
      <View className="flex-1 bg-[#000000A1]">
        <View className="flex-1 p-4">
          <ScrollView>
            <View style={styles.spacing8} />

            <Text style={styles.estadoText}>{locale === 'es' ? info.Estado : info.state_name}</Text>

            <Text style={styles.detalleText}>
              {i18n.t('history.unit')}: {info.Numero}
            </Text>
            <Text style={styles.detalleText}>
              {i18n.t('history.area')}: {locale === 'es' ? info.NombreArea : info.area_name}
            </Text>
            <Text style={styles.detalleText}>
              {i18n.t('history.equipment')}: {locale === 'es' ? info.NombreEquipo : info.equipment_name}
            </Text>
            <Text style={styles.detalleText}>
              {i18n.t('history.problem')}: {locale === 'es' ? info.NombreProblema : info.problem_name}
            </Text>
            <Text style={styles.detalleText}>
              {i18n.t('history.comments')}: {info.Comentarios}
            </Text>

            <View style={styles.spacing16} />

            <View style={Styles.comentarios}>
              <Text style={styles.comentariosText}>{info.ComentariosAplica}</Text>
            </View>

            <View style={styles.spacing16} />

            <View style={styles.imagenesRow}>
              <View style={Styles.imagenesContent}>
                {info.Img1 && <ImagenButton index={1} imagen={{ uri: info.Img1 }} navigation={navigation} />}
                {info.Img2 && <ImagenButton index={2} imagen={{ uri: info.Img2 }} navigation={navigation} />}
                {info.Img3 && <ImagenButton index={3} imagen={{ uri: info.Img3 }} navigation={navigation} />}
              </View>
            </View>

            <View style={styles.spacing32} />
          </ScrollView>
        </View>
        <Modal visible={modalImagen} transparent={true} onBackButtonPress={() => setModalImagen(false)}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={() => setModalImagen(false)} accessible accessibilityLabel="Cerrar">
                  <Feather name="x" size={32} color="#fff" />
                </TouchableOpacity>
              </View>
              <ZoomableImage uri={zoomImagen?.uri} />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButtonContainer: {
    padding: 10,
    alignItems: 'flex-end',
  },
  spacing8: {
    height: 8,
  },
  spacing16: {
    height: 16,
  },
  spacing32: {
    height: 32,
  },
  estadoText: {
    textAlign: 'center',
    color: Colores.DetalleText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalleText: {
    fontSize: 16,
    padding: 5,
    color: Colores.DetalleText,
  },
  comentariosText: {
    fontSize: 16,
    color: '#000',
  },
  imagenesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  imagenButtonContainer: {
    width: 100,
    height: 80,
    padding: 5,
  },
  imagenButtonImage: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
})

export default Consumer(Historico)
