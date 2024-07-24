import React from "react";
import {TouchableOpacity, Text, ActivityIndicator} from "react-native";
import Styles from "../../styles/components/BotonEnviarStyle";
import {useLanguageContext} from "../../context/lang";

function _onSubmit(onSubmit) {
   if (onSubmit) {
      onSubmit();
   }
}

const BotonEnviar = (props) => {
   const {i18n} = useLanguageContext();
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
            {i18n.t("button.send")}
         </Text>
      </TouchableOpacity>
   );
};

export default BotonEnviar;
