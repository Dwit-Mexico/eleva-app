import React from "react";
import {TouchableOpacity, ActivityIndicator} from "react-native";
import BotonStyles from "../../styles/buttons";

const BotonWizard = (props) => {
   if (props.loading) {
      return (
         <TouchableOpacity onPress={() => props.onPress()} style={props.style}>
            <ActivityIndicator color={BotonStyles.spinner.color} />
         </TouchableOpacity>
      );
   }

   return (
      <TouchableOpacity onPress={() => props.onPress()} style={props.style}>
         {props.children}
      </TouchableOpacity>
   );
};

export default BotonWizard;
