import React, {useState} from "react";
import {FlatList, RefreshControl} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {Consumer} from "../../context";
import CardGarantia from "./CardGarantia";
import {useLanguageContext} from "../../context/lang";

function ListaViviendas({navigation, context, lista}) {
  const {locale} = useLanguageContext();
  const translate = locale === "en";
  const [isRefreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    if (context) {
      await context.getSetUnidades();
      await context.reloadReportes(translate);
    }
    setRefreshing(false);
  }

  return (
    <FlatList
      data={lista}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh.bind(this)}
        />
      }
      renderItem={(card) => (
        <CardGarantia
          key={card.item.IdGroup}
          etapa={1}
          navigation={navigation}
          item={card.item}
          icon={<FontAwesome5 name="book-open" size={24} color="black" />}
          ruta="ListaDetalleReportes"
        />
      )}
      keyExtractor={(item) => `${item.IdGroup}`}
    />
  );
}

export default Consumer(ListaViviendas);
