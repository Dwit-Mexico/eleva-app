import React, {useState} from "react";
import {FlatList, RefreshControl} from "react-native";
import CardLista from "./CardLista";

function ListaDocumentos({navigation, lista, reload}) {
   const [isRefreshing, setRefreshing] = useState(false);

   async function onRefresh() {
      setRefreshing(true);
      if (reload) {
         await reload();
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
            <CardLista navigation={navigation} item={card.item} />
         )}
         keyExtractor={(item) => `${item.IdDocumento}`}
      />
   );
}

export default ListaDocumentos;
