import React, {useEffect, useState, useRef} from "react";
import {
   View,
   Animated,
   Text,
   TextInput,
   TouchableWithoutFeedback,
   Keyboard,
} from "react-native";
import {Consumer} from "../../../../context";
import Styles from "../../../../styles/components/WizardStyle";
import Colores from "../../../../styles/colores";
import {useLanguageContext} from "../../../../context/lang";

function Comentarios(props) {
   const {i18n} = useLanguageContext();
   const animatedOpacity = useRef(new Animated.Value(0)).current;

   const [comentario, setComentario] = useState("");

   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 1000,
         useNativeDriver: true,
      }).start();
   }, []);

   function onChange(text) {
      setComentario(text);
      if (props.setComentario) {
         props.setComentario(text);
      }
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <View style={{flex: 1}}>
            <Animated.View
               style={{
                  flex: 1,
                  height: "100%",
                  opacity: animatedOpacity,
               }}
            >
               <Text
                  style={{
                     fontSize: 18,
                     textAlign: "center",
                     padding: 10,
                     color: Colores.WizardTitle,
                  }}
               >
                  {i18n.t("reports.comment")}
               </Text>

               <View style={{height: 8}} />

               <TextInput
                  value={props.comentario || comentario}
                  placeholder={i18n.t("reports.comments")}
                  style={Styles.comentarios}
                  multiline
                  numberOfLines={6}
                  maxLength={1500}
                  onChangeText={onChange.bind(this)}
               />
            </Animated.View>
         </View>
      </TouchableWithoutFeedback>
   );
}

export default Consumer(Comentarios);
