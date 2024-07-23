import React, {useState, useEffect, useRef} from "react";
import {
   Alert,
   FlatList,
   View,
   Text,
   ImageBackground,
   ActivityIndicator,
   RefreshControl,
} from "react-native";
import {Consumer} from "../../context";
import {useRoute} from "@react-navigation/native";
import Request from "../../core/api";
import Container from "../../components/container";
import BotonAccion from "../../components/boton/BotonAccion";
import CardUsuario from "../../components/usuarios/CardUsuario";
import Styles from "../../styles/screens/PerfilStyle";
import Colores from "../../styles/colores";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function Usuarios({navigation}) {
   const {i18n} = useLanguageContext();
   const [loading, setLoading] = useState(true);
   const [usuarios, setUsuarios] = useState([]);
   const [unidades, setUnidades] = useState([]);

   const route = useRoute();

   async function loadUsuarios() {
      setLoading(true);
      const response = await request.get("/app/usuarios/obtener");

      if (response.error || response.empty) {
         Alert.alert(null, response.message || i18n.t("users.error"));
      }

      if (Array.isArray(response.usuarios)) {
         setUsuarios(response.usuarios);
      } else {
         Alert.alert(null, response.message || i18n.t("users.error"));
      }

      setLoading(false);
   }

   useEffect(() => {
      loadUsuarios();
   }, []);

   useEffect(() => {
      const {unidades} = route.params;
      if (unidades) {
         setUnidades(unidades);
      }
   }, [route.params]);

   function reload() {
      loadUsuarios();
   }

   return (
      <ImageBackground
         source={require("../../../assets/background.jpg")}
         style={{flex: 1}}
      >
         <View style={Styles.backGround}>
            <Container>
               <View>
                  <BotonAccion
                     onPress={() =>
                        navigation.navigate("AgregarUsuario", {unidades})
                     }
                  >
                     <Text allowFontScaling={false} style={Styles.ButtonText}>
                        {i18n.t("users.add")}
                     </Text>
                  </BotonAccion>
               </View>
               <View style={{height: 24}} />
               <View
                  style={{
                     flex: 1,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  {loading ? (
                     <ActivityIndicator
                        color={Colores.spinnerColor}
                        size={30}
                     />
                  ) : (
                     <FlatList
                        data={usuarios}
                        refreshControl={
                           <RefreshControl
                              refreshing={loading}
                              onRefresh={loadUsuarios.bind(this)}
                           />
                        }
                        renderItem={(card) => {
                           const {item} = card;
                           return (
                              <CardUsuario
                                 key={item.IdPersona}
                                 item={item}
                                 reload={reload.bind(this)}
                              />
                           );
                        }}
                        keyExtractor={(item) => `${item.IdPersona}`}
                     />
                  )}
               </View>
            </Container>
         </View>
      </ImageBackground>
   );
}

export default Consumer(Usuarios);
