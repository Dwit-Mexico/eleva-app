import React, {useState} from "react";
import {FlatList, RefreshControl} from "react-native";
import CardNotificacion from "./CardNotificacion";

function ListaNotificaciones({navigation, lista, reload}) {
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
            <CardNotificacion navigation={navigation} item={card.item} />
         )}
         keyExtractor={(item) => `${item.IdLog}`}
      />
   );
}

export default ListaNotificaciones;
