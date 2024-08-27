import React, {useState, useEffect} from "react";
import {Alert, View, ImageBackground} from "react-native";
import {useRoute} from "@react-navigation/native";
import Request from "../../core/api";
import Container from "../../components/container";
import Lista from "../../components/documentos/Lista";
import Styles from "../../styles/screens/DocumentosStyle";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function ListaDocumentos({navigation}) {
  const {i18n} = useLanguageContext();
  const [lista, setLista] = useState([]);
  const route = useRoute();

  async function getDocumentos() {
    const {data} = route.params;

    if (!data) {
      Alert.alert(null, i18n.t("documents.error"));
      navigation.goBack();
      return;
    }

    const response = await request.get("/app/documentos/get", {
      IdFolder: data.IdFolder,
    });

    if (response.error) {
      Alert.alert(null, i18n.t("documents.error3"));
    }

    if (Array.isArray(response.data)) {
      setLista(response.data);
    }
  }

  useEffect(() => {
    getDocumentos();
  }, []);

  async function reload() {
    getDocumentos();
  }

  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={{flex: 1, height: "100%"}}
    >
      <View style={Styles.backGround}>
        <Container>
          <Lista
            navigation={navigation}
            lista={lista}
            reload={reload.bind(this)}
          />
        </Container>
      </View>
    </ImageBackground>
  );
}

export default ListaDocumentos;
