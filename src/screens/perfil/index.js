import React, {useEffect, useState, useCallback} from "react";
import {
   Alert,
   View,
   Text,
   TouchableOpacity,
   ImageBackground,
   ActivityIndicator,
} from "react-native";
import {Consumer} from "../../context";
import {useFocusEffect} from "@react-navigation/native";
import Request from "../../core/api";
import Container from "../../components/container";
import ListaViviendas from "../../components/lista-viviendas";
import BotonAccion from "../../components/boton/BotonAccion";
import Styles from "../../styles/screens/PerfilStyle";
import StylesButtons from "../../styles/buttons";
import StylesTexts from "../../styles/text";
import Colores from "../../styles/colores";

const request = new Request();

const styleUserData = {
   position: "absolute",
   backgroundColor: "#fff",
   width: "80%",
   top: -30,
   borderRadius: 5,
   padding: 5,
   zIndex: 2,
   shadowColor: "#000000",
   shadowOffset: {
      width: 0,
      height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 3.84,
   elevation: 6,
};

function Perfil({navigation, context}) {
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState({Nombre: ""});
   const [unidades, setUnidades] = useState([]);
   const [error, setError] = useState(false);

   function _logOut(context) {
      if (context) {
         context.logout();
      }
   }

   async function getUsuarioInfo() {
      if (context) {
         const user = await request.post("/app/users/decode/token", {
            token: context.token,
         });
         setUser(user);

         const response = await request.get("/app/unidades/get/unidades");

         if (response.error) {
            Alert.alert(
               null,
               response.message ||
                  "No se pudo obtener la información del usuario."
            );
            setError(true);
         }

         if (response.data) {
            setUnidades(response.data);
            setError(false);
         }
      }

      setLoading(false);
   }

   useEffect(() => {
      getUsuarioInfo();
   }, []);

   useFocusEffect(
      useCallback(() => {
         if (error) {
            getUsuarioInfo();
         }
      }, [error])
   );

   return (
      <>
         <View style={{height: "25%"}}>
            <ImageBackground
               source={require("../../../assets/background.jpg")}
               style={{width: "100%", height: "100%"}}
            ></ImageBackground>
         </View>
         <View
            style={{
               flex: 1,
               borderTopColor: "#B29360",
               borderTopWidth: 5,
               position: "relative",
               alignItems: "center",
            }}
         >
            <View style={styleUserData}>
               <Text
                  allowFontScaling={false}
                  style={{fontSize: 18, color: "#B29360", fontWeight: "bold"}}
               >
                  {user.Nombre}
               </Text>
               <View style={{height: 8}} />
               <Text
                  allowFontScaling={false}
                  style={{fontSize: 18, color: "#000"}}
               >
                  {user.Direccion}
               </Text>
            </View>
            <View style={{flex: 1, width: "100%", backgroundColor: "#fff"}}>
               <Container>
                  <View style={{height: 50}} />
                  <View style={{flex: 1, width: "100%"}}>
                     <View style={{flex: 0.8}}>
                        {loading ? (
                           <ActivityIndicator
                              size={30}
                              color={Colores.spinnerColor}
                           />
                        ) : (
                           <ListaViviendas lista={unidades} />
                        )}
                     </View>
                     <View style={Styles.logoutButtonView}>
                        {user.Propietario && (
                           <View style={{width: 130}}>
                              <BotonAccion
                                 onPress={() =>
                                    navigation.navigate("Usuarios", {unidades})
                                 }
                                 disabled={loading}
                              >
                                 <Text
                                    allowFontScaling={false}
                                    style={StylesTexts.logoutButton}
                                 >
                                    Usuarios
                                 </Text>
                              </BotonAccion>
                           </View>
                        )}
                        <View style={{width: 130}}>
                           <TouchableOpacity
                              onPress={_logOut.bind(this, context)}
                              style={StylesButtons.logoutButton}
                           >
                              <Text
                                 allowFontScaling={false}
                                 style={StylesTexts.logoutButton}
                              >
                                 Cerrar sesión
                              </Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               </Container>
            </View>
         </View>
      </>
   );
}

export default Consumer(Perfil);
