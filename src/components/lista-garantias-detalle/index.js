import React, {useState, useEffect} from "react";
import {FlatList, RefreshControl} from "react-native";
import {Consumer} from "../../context";
import moment from "moment-timezone";
import CardGarantia from "./CardDetalleGarantia";
import {useLanguageContext} from "../../context/lang";

function ListaGarantiasDetalle({navigation, etapa, context, lista, reporte}) {
  const {locale} = useLanguageContext();
  const [list, setList] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  if (context) {
    useEffect(() => {
      let reportes = lista || [];

      setList(reportes);
    }, [lista]);
  }

  async function onRefresh() {
    const translate = locale === "en";
    setRefreshing(true);
    if (context) {
      await context.reloadReportes(translate);
    }
    setRefreshing(false);
  }

  return (
    <FlatList
      data={list}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh.bind(this)}
        />
      }
      renderItem={(card) => {
        const {item} = card;
        return (
          <CardGarantia
            key={item.IdSolicitud}
            id={item.IdSolicitud}
            etapa={etapa}
            navigation={navigation}
            proyecto={item.NombreProyecto}
            unidad={item.Numero}
            problema={locale === "en" ? item.problem_name : item.NombreProblema}
            direccion=""
            area={locale === "en" ? item.area_name : item.NombreArea}
            fecha={moment.utc(item.Fecha).format("DD/MM/YYYY")}
            data={card}
            reporte={reporte}
            NoSolicitud={item.NoSolicitud}
          />
        );
      }}
      keyExtractor={(item) => `${item.IdSolicitud}`}
    />
  );
}

export default Consumer(ListaGarantiasDetalle);
