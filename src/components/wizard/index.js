import React, {useState, useEffect} from "react";
import {Alert, View, Text, TouchableOpacity} from "react-native";
import {Consumer} from "../../context";
import BotonEnviar from "../boton-enviar/BotonEnviar";
import WizardStyle from "../../styles/components/WizardStyle";
import {useLanguageContext} from "../../context/lang";

const Wizard = ({context, steps, ultimo, onSubmit, loading, terminado}) => {
   const {i18n} = useLanguageContext();
   const [page, setPage] = useState(1);
   const [totalSteps, setTotalSteps] = useState(0);

   function prevStep() {
      if (page > 1) {
         context.setStep(page - 1);
      }
   }

   function nextStep() {
      if (page == 1 && !context.unidad) {
         Alert.alert(null, i18n.t("reports.selectUnit"));
         return;
      }
      if (page == 2 && !context.area) {
         Alert.alert(null, i18n.t("reports.selectArea"));
         return;
      }
      if (page == 3 && !context.equipo) {
         Alert.alert(null, i18n.t("reports.selectEquipment"));
         return;
      }
      if (page == 4 && !context.problema) {
         Alert.alert(null, i18n.t("reports.selectProblem"));
         return;
      }

      if (page < totalSteps && context) {
         context.setStep(page + 1);
      }
   }

   useEffect(() => {
      const propSteps = steps;
      if (Array.isArray(propSteps)) {
         setTotalSteps(propSteps.length);
      }
   }, [steps]);

   if (context) {
      useEffect(() => {
         setPage(context.step);
      }, [context.step]);
   }

   useEffect(() => {
      if (terminado) {
         context.setStep(steps.length);
      }
   }, [terminado]);

   return (
      <View style={{flex: 1, flexDirection: "column", position: "relative"}}>
         {steps[page - 1]}

         {!terminado ? (
            <View
               style={{
                  flex: 1,
                  position: "absolute",
                  bottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
               }}
            >
               <TouchableOpacity
                  onPress={prevStep.bind(this)}
                  style={WizardStyle.navigationButton}
               >
                  <Text
                     allowFontScaling={false}
                     style={WizardStyle.navigationButtonText}
                  >
                     {i18n.t("button.back")}
                  </Text>
               </TouchableOpacity>
               {page == ultimo ? (
                  <BotonEnviar onSubmit={onSubmit} loading={loading} />
               ) : (
                  <TouchableOpacity
                     style={WizardStyle.navigationButton}
                     onPress={nextStep.bind(this)}
                  >
                     <Text
                        allowFontScaling={false}
                        style={WizardStyle.navigationButtonText}
                     >
                        {i18n.t("button.next")}
                     </Text>
                  </TouchableOpacity>
               )}
            </View>
         ) : null}
      </View>
   );
};

export default Consumer(Wizard);
