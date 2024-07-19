import React from "react";
import {TouchableOpacity, Text, ActivityIndicator} from "react-native";
import Styles from "../../styles/components/BotonEnviarStyle";

function _onSubmit(onSubmit) {
   if (onSubmit) {
      onSubmit();
   }
}

const BotonEnviar = (props) => {
   const {navigation, onSubmit} = props;
   if (props.loading) {
      return (
         <TouchableOpacity style={Styles.boton}>
            <ActivityIndicator color={Styles.spinner.color} />
         </TouchableOpacity>
      );
   }
   return (
      <TouchableOpacity
         style={Styles.boton}
         onPress={_onSubmit.bind(this, onSubmit)}
      >
         <Text allowFontScaling={false} style={Styles.text}>
            Enviar
         </Text>
      </TouchableOpacity>
   );
};

export default BotonEnviar;
