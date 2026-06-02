import React, { useState, useEffect } from 'react'
import { ScrollView, TouchableOpacity, Text, View } from 'react-native'
import { Consumer } from '../../context'
import InputStyles from '../../styles/inputs'

function SelectProblema({ onSelect, value, context }) {
  const [problemas, setProblemas] = useState([])
  const [selected, setSelected] = useState()

  if (context) {
    useEffect(() => {
      let problemasNew = Array.isArray(context.problemas) ? context.problemas : []
      problemasNew = problemasNew.map(p => {
        return { id: p.IdProblema, name: p.NombreProblema }
      })
      setProblemas(problemasNew)

      if (value) {
        setSelected(value)
      }
    }, [context.problemas])
  }

  async function selectProblema(id) {
    setSelected(id)

    if (onSelect) {
      onSelect(id)
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
        {problemas.map((problema, index) => (
          <TouchableOpacity
            key={problema.id}
            onPress={() => selectProblema(problema.id)}
            className={`flex-col items-center p-2 border border-[#B29330] rounded ${
              problema.id === selected ? 'bg-[#B29330]' : ''
            }`}
          >
            <Text className="text-white font-bold text-lg">{problema.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

export default Consumer(SelectProblema)
