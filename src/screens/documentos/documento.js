import React, {useState, useEffect} from "react";
import {useRoute} from "@react-navigation/native";
import {View, Text, ImageBackground} from "react-native";
import WebView from "react-native-webview";
import Styles from "../../styles/screens/DocumentosStyle";
import Colores from "../../styles/colores";
import {Platform} from "react-native-web";
import {useLanguageContext} from "../../context/lang";

function Documento() {
   const {i18n} = useLanguageContext();
   const [loading, setLoading] = useState(true);
   const [url, setUrl] = useState("");
   const route = useRoute();

   if (route.params) {
      useEffect(() => {
         const {data} = route.params;
         if (data) {
            const pdfUri =
               Platform.OS === "ios"
                  ? data.path
                  : `https://docs.google.com/gview?embedded=true&url=${data.path}`;
            setUrl(pdfUri);
         }
      }, [route.params]);
   }

   return (
      <ImageBackground
         source={require("../../../assets/background.jpg")}
         style={{flex: 1, height: "100%"}}
      >
         <View style={Styles.backGround}>
            <View
               style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            >
               <View style={{height: loading ? "80%" : "100%", width: "100%"}}>
                  {loading && (
                     <View
                        style={{
                           height: "20%",
                           width: "100%",
                           flex: 1,
                           justifyContent: "center",
                           alignItems: "center",
                        }}
                     >
                        <Text
                           style={{
                              color: Colores.CardCarpetaColor,
                              fontSize: 18,
                           }}
                        >
                           {i18n.t("documents.loading")}
                        </Text>
                     </View>
                  )}

                  <View
                     style={{height: loading ? "80%" : "100%", width: "100%"}}
                  >
                     <WebView
                        style={{flex: 1}}
                        source={{
                           uri: url,
                        }}
                        onLoad={() => setLoading(false)}
                     />
                  </View>
               </View>
            </View>
         </View>
      </ImageBackground>
   );
}

export default Documento;
