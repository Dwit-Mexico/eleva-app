import React, {useEffect, useRef} from "react";
import {View, Animated, Text} from "react-native";
import {Consumer} from "../../../../context";
import SelectUnidad from "../../../../components/select/SelectUnidad";
import Styles from "../../../../styles/components/WizardStyle";

function SeleccionarUnidad({unidad, setUnidad}) {
   const animatedOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();
   }, []);

   function onSelect(opcion) {
      if (setUnidad) {
         setUnidad(opcion);
      }
   }

   return (
      <View style={{flex: 1}}>
         <Animated.View
            style={{
               flex: 1,
               height: "100%",
               opacity: animatedOpacity,
            }}
         >
            <Text style={Styles.titleStyle}>¿En donde ocurrió el detalle?</Text>
            <SelectUnidad onSelect={onSelect.bind(this)} value={unidad} />
         </Animated.View>
      </View>
   );
}

export default Consumer(SeleccionarUnidad);
