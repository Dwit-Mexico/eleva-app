import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Consumer } from '../../context'
import { useLanguageContext } from '../../context/lang'

function SelectArea({ onSelect, value, context }) {
  const { locale } = useLanguageContext()
  const [areas, setAreas] = useState([])
  const [selected, setSelected] = useState()

  if (context) {
    useEffect(() => {
      let result = context.areas

      if (Array.isArray(result)) {
        let areasNew = result
        areasNew = areasNew.map(p => {
          return {
            id: p.IdArea,
            name: p.NombreArea,
            idTipo: p.IdTipoUnidadArea,
          }
        })
        setAreas(areasNew)
      }

      if (value) {
        setSelected(value)
      }
    }, [context.areas])
  }

  async function selectArea(area) {
    const translate = locale === 'en'
    setSelected(area.id)

    if (onSelect) {
      onSelect(area.id)
    }

    if (context) {
      await context.getEquipos(area.idTipo, translate)
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
      <View className="flex-row flex-wrap gap-2 justify-center">
        {areas.map((area, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectArea(area)}
            className={`flex-col items-center p-2 border border-[#B29330] rounded ${
              area.id === selected ? 'bg-[#B29330]' : ''
            }`}
          >
            <Text className="text-white font-bold text-lg">{area.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Consumer(SelectArea)
