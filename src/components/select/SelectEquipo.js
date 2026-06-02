import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { Consumer } from '../../context'
import { useLanguageContext } from '../../context/lang'

function SelectEquipo({ onSelect, value, context }) {
  const { locale } = useLanguageContext()
  const [equipos, setEquipos] = useState([])
  const [selected, setSelected] = useState()

  if (context) {
    useEffect(() => {
      let equiposNew = Array.isArray(context.equipos) ? context.equipos : []
      equiposNew = equiposNew.map(p => {
        return { id: p.IdEquipo, name: p.NombreEquipo }
      })
      setEquipos(equiposNew)

      if (value) {
        setSelected(value)
      }
    }, [context.equipos])
  }

  async function selectEquipo(id) {
    const translate = locale === 'en'
    setSelected(id)

    if (onSelect) {
      onSelect(id)
    }

    if (context) {
      await context.getProblemas(id, translate)
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
        {equipos.map((equipo, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectEquipo(equipo.id)}
            className={`flex-col items-center p-2 border border-[#B29330] rounded ${
              equipo.id === selected ? 'bg-[#B29330]' : ''
            }`}
          >
            <Text className="text-white font-bold text-lg">{equipo.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Consumer(SelectEquipo)
