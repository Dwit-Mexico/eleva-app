import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Consumer } from '../../context'
import InputStyles from '../../styles/inputs'
import { useLanguageContext } from '../../context/lang'

const onSelectionsChange = (data, onChange) => {
  if (onChange) {
    onChange(data[0])
  }
}

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
      {unidades.map((unidad, index) => {
        const textStyle = unidad.id == selected ? InputStyles.itemTextSelected : InputStyles.itemTextNormal

        return (
          <TouchableOpacity
            key={index}
            onPress={selectUnidad.bind(this, unidad.id)}
            style={unidad.id == selected ? InputStyles.itemSelected : InputStyles.itemNormal}
          >
            <Text style={textStyle}>{unidad.name}</Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

export default Consumer(SelectUnidad)
