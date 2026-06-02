import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Consumer } from '../../context'
import InputStyles from '../../styles/inputs'
import { useLanguageContext } from '../../context/lang'

function SelectUnidad({ onSelect, value, context }) {
  const { locale } = useLanguageContext()
  const [unidades, setUnidades] = useState([])
  const [selected, setSelected] = useState()

  if (context) {
    useEffect(() => {
      let unidadesNew = Array.isArray(context.unidades) ? context.unidades : []
      unidadesNew = unidadesNew.map(u => {
        return { id: u.IdUnidad, name: u.Numero }
      })
      setUnidades(unidadesNew)

      if (value) {
        setSelected(value)
      }
    }, [context.unidades])
  }

  async function selectUnidad(id) {
    const translate = locale === 'en'
    setSelected(id)

    if (onSelect) {
      onSelect(id)
    }

    if (context) {
      context.getAreas(id, translate)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <View className="gap-2">
        {unidades.map((unidad, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectUnidad(unidad.id)}
            className={`flex-row items-center p-2 border border-[#B29330] rounded ${
              unidad.id === selected ? 'bg-[#B29330]' : ''
            }`}
          >
            <Text className="text-white font-bold text-lg">{unidad.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Consumer(SelectUnidad)
