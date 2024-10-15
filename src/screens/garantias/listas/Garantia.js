import React, {useState, useEffect} from "react";
import {View, ImageBackground} from "react-native";
import {Consumer} from "../../../context";
import Container from "../../../components/container";
import ListaGarantias from "../../../components/lista-garantias-detalle";
import Styles from "../../../styles/screens/GarantiasStyle";
import {useLanguageContext} from "../../../context/lang";

const ListaGarantia = ({navigation, context}) => {
  const {locale} = useLanguageContext();
  const translate = locale === "en";
  const [lista, setLista] = useState([]);

  useEffect(() => {
    onRefresh();
  }, []);

  async function onRefresh() {
    if (context) {
      await context.reloadReportes(translate);
    }
  }

  if (context) {
    useEffect(() => {
      let reportes = context.reportes;

      if (Array.isArray(reportes)) {
        reportes = reportes.filter(
          (r) =>
            r.IdEstado == 2 ||
            r.IdEstado == 3 ||
            r.IdEstado == 4 ||
            r.IdEstado == 5 ||
            r.IdEstado == 7
        );
        setLista(reportes);
      }
    }, [context.reportes]);
  }

  return (
    <ImageBackground
      source={require("../../../../assets/background2.jpg")}
      style={{flex: 1}}
    >
      <View style={Styles.backGround}>
        <Container>
          <ListaGarantias navigation={navigation} lista={lista} etapa={2} />
        </Container>
      </View>
    </ImageBackground>
  );
};

export default Consumer(ListaGarantia);
