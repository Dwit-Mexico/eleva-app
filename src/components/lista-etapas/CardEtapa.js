import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardStyles from '../../styles/components/CardEtapaStyle'

function CardEtapa(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation
          ? props.navigation.navigate(props.ruta, {
              garantiaEtapa: props.etapa,
              detalle: true,
            })
          : null
      }
    >
      <View className="flex-col items-center justify-center align-center gap-2">
        {props.icon}
        <Text className="text-white text-2xl ">{props.titulo}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardEtapa
