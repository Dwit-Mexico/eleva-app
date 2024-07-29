import React, {useState, useEffect} from "react";
import {ScrollView, TouchableOpacity, Text} from "react-native";
import {Consumer} from "../../context";
import InputStyles from "../../styles/inputs";
import {useLanguageContext} from "../../context/lang";

onSelectionsChange = (data, onChange) => {
   if (onChange) {
      onChange(data[0]);
   }
};

function SelectEquipo({onSelect, value, context}) {
   const {locale} = useLanguageContext();
   const [equipos, setEquipos] = useState([]);
   const [selected, setSelected] = useState();

   if (context) {
      useEffect(() => {
         let equiposNew = Array.isArray(context.equipos) ? context.equipos : [];
         equiposNew = equiposNew.map((p) => {
            return {id: p.IdEquipo, name: p.NombreEquipo};
         });
         setEquipos(equiposNew);

         if (value) {
            setSelected(value);
         }
      }, [context.equipos]);
   }

   async function selectEquipo(id) {
      translate = locale === "en";
      setSelected(id);

      if (onSelect) {
         onSelect(id);
      }

      if (context) {
         await context.getProblemas(id, translate);
      }
   }

   return (
      <ScrollView
         contentContainerStyle={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
         }}
      >
         {equipos.map((equipo) => {
            return (
               <TouchableOpacity
                  key={equipo.id}
                  onPress={selectEquipo.bind(this, equipo.id)}
                  style={
                     equipo.id == selected
                        ? InputStyles.itemSelected
                        : InputStyles.itemNormal
                  }
               >
                  <Text
                     style={
                        equipo.id == selected
                           ? InputStyles.itemTextSelected
                           : InputStyles.itemTextNormal
                     }
                  >
                     {equipo.name}
                  </Text>
               </TouchableOpacity>
            );
         })}
      </ScrollView>
   );
}

export default Consumer(SelectEquipo);
