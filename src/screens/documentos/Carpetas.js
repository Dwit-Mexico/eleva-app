import React, {useState, useEffect} from "react";
import {Alert, View, ImageBackground, ActivityIndicator} from "react-native";
import {Consumer} from "../../context";
import Request from "../../core/api";
import Container from "../../components/container";
import Carpetas from "../../components/documentos/Carpetas";
import Styles from "../../styles/screens/DocumentosStyle";
import Colores from "../../styles/colores";

const request = new Request();

function Documentos({navigation}) {
   const [loading, setLoading] = useState(true);
   const [lista, setLista] = useState([]);

   useEffect(() => {
      getCarpetas();
   }, []);

   async function getCarpetas() {
      const response = await request.get("/app/documentos/get/folders");

      if (response.error) {
         Alert.alert(
            null,
            response.message || "No se pudieron obtener las carpetas"
         );
      }

      if (Array.isArray(response.data)) {
         setLista(response.data);
      }

      setLoading(false);
   }

   async function reload() {
      await getCarpetas();
   }

   return (
      <ImageBackground
         source={require("../../../assets/background.jpg")}
         style={{flex: 1, height: "100%"}}
      >
         <View style={Styles.backGround}>
            <Container>
               <View
                  style={{
                     flex: 1,
                     justifyContent: "center",
                     alignItems: "center",
                  }}
               >
                  {loading ? (
                     <ActivityIndicator
                        color={Colores.spinnerColor}
                        size={30}
                     />
                  ) : (
                     <View style={{width: "100%", height: "100%"}}>
                        <Carpetas
                           navigation={navigation}
                           lista={lista}
                           reload={reload.bind(this)}
                        />
                     </View>
                  )}
               </View>
            </Container>
         </View>
      </ImageBackground>
   );
}

export default Consumer(Documentos);
