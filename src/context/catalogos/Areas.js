import Request from "../../core/api";
import {useLanguageContext} from "../lang";

const request = new Request();

export async function getAreas(IdUnidad) {
   const {locale} = useLanguageContext();

   this.setState({areas: []});

   const response = await request.get("/app/unidades/get/areas/unidad", {
      IdUnidad,
   });

   if (Array.isArray(response.data)) {
      if (locale === "en") {
         response.data.map((p) => {
            return {
               IdArea: p.IdArea,
               NombreArea: p.area_name,
               IdTipoUnidadArea: p.IdTipoUnidadArea,
            };
         });
      } else this.setState({areas: response.data});
      o;
   }

   return response;
}
