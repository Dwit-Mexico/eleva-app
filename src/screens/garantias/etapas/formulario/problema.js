import React, {useEffect, useRef} from "react";
import {View, Animated, Text} from "react-native";
import {Consumer} from "../../../../context";
import SelectProblema from "../../../../components/select/SelectProblema";
import Styles from "../../../../styles/components/WizardStyle";
import {useLanguageContext} from "../../../../context/lang";

function SeleccionarProblema({problema, setProblema}) {
   const {i18n} = useLanguageContext();
   const animatedOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();
   }, []);

   function onSelect(opcion) {
      if (setProblema) {
         setProblema(opcion);
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
            <Text style={Styles.titleStyle}>{i18n.t("reports.problem")}</Text>
            <SelectProblema
               onSelect={(opcion) => onSelect(opcion)}
               value={problema}
            />
         </Animated.View>
      </View>
   );
}

export default Consumer(SeleccionarProblema);
