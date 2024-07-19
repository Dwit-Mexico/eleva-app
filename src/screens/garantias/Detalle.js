import React, {useState} from "react";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import Wizard from "./etapas/Wizard";
import Container from "../../components/container";

function DetalleGarantia({navigation}) {
   const [etapa, setEtapa] = useState(0);
   const [esDetalle, setEsDetalle] = useState(false);

   const route = useRoute();

   useFocusEffect(() => {
      if (route.params) {
         const {garantiaEtapa, detalle} = route.params;
         setEtapa(garantiaEtapa);
         setEsDetalle(detalle);
      }
   });

   const Etapa = ({etapaIndex, navigation}) => {
      return <Wizard navigation={navigation} esDetalle={esDetalle} />;
   };

   return (
      <Container>
         <Etapa etapaIndex={etapa} navigation={navigation} />
      </Container>
   );
}

export default DetalleGarantia;
