import React, {useState, useEffect} from "react";
import {ScrollView, RefreshControl} from "react-native";
import {Consumer} from "../../context";
import moment from "moment-timezone";
import CardVivienda from "./CardVivienda";

function ListaViviendas({context, lista}) {
  const [loading, setLoading] = useState(false);
  const [unidades, setUnidades] = useState([]);

  if (context) {
    useEffect(() => {
      setUnidades(context.unidades || []);
    }, [context.unidades]);
  }

  async function reload() {
    setLoading(true);
    if (context) {
      await context.initApp();
    }
    setLoading(false);
  }

  return (
    <ScrollView
      style={{height: "50%"}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => reload()} />
      }
    >
      {lista.map((unidad) => {
        return (
          <CardVivienda
            key={unidad.IdUnidad}
            proyecto={unidad.Nombre}
            nombre={unidad.Numero}
            direccion={unidad.Direccion}
            fecha={
              unidad.FechaVencimiento
                ? moment.utc(unidad.FechaVencimiento).format("DD/MM/YYYY")
                : ""
            }
          />
        );
      })}
    </ScrollView>
  );
}

export default Consumer(ListaViviendas);
