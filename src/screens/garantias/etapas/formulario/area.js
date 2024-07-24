import React, {useEffect, useRef} from "react";
import {View, Animated, Text} from "react-native";
import {Consumer} from "../../../../context";
import SelectArea from "../../../../components/select/SelectArea";
import Styles from "../../../../styles/components/WizardStyle";
import {useLanguageContext} from "../../../../context/lang";

function SeleccionarArea({setArea, area, context}) {
   const {i18n} = useLanguageContext();
   const animatedOpacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();

      async function init() {
         if (context) {
            const form = await context.getForm();
            if (form.area) {
               value = form.area;
            }
         }
      }

      init();
   }, []);

   function onSelect(opcion) {
      if (setArea) {
         setArea(opcion);
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
            <Text style={Styles.titleStyle}>{i18n.t("reports.area")}</Text>
            <SelectArea onSelect={onSelect.bind(this)} value={area} />
         </Animated.View>
      </View>
   );
}

export default Consumer(SeleccionarArea);
