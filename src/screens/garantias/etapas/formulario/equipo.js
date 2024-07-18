import React, {useEffect, useRef} from "react";
import {View, Animated, Text} from "react-native";
import {Consumer} from "../../../../context";
import SelectEquipo from "../../../../components/select/SelectEquipo";
import Styles from "../../../../styles/components/WizardStyle";

function SeleccionarEquipo({equipo, setEquipo}) {
   const animatedOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();
   }, []);

   function onSelect(opcion) {
      if (setEquipo) {
         setEquipo(opcion);
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
            <Text style={Styles.titleStyle}>¿Que equipo presenta detalle?</Text>
            <SelectEquipo
               onSelect={(opcion) => onSelect(opcion)}
               value={equipo}
            />
         </Animated.View>
      </View>
   );
}

export default Consumer(SeleccionarEquipo);
