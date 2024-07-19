import React, {useEffect} from "react";
import {View, ActivityIndicator} from "react-native";
import {Consumer} from "../../context";
import Styles from "../../styles/components/LoadingScreenStyle";

const LoadingLoginScreen = ({context}) => {
   if (context) {
      useEffect(() => {
         context.initApp();
      }, []);
   }

   return (
      <View style={Styles.loadingLoginScreen}>
         <ActivityIndicator
            size={"large"}
            color={Styles.loadingLoginScreenSpinner.color}
         />
      </View>
   );
};

export default Consumer(LoadingLoginScreen);
