import Request from "../../core/api";

const request = new Request();

export async function getAreas(IdUnidad, translate) {
   this.setState({areas: []});

   const response = await request.get("/app/unidades/get/areas/unidad", {
      IdUnidad,
   });

   if (Array.isArray(response.data)) {
      if (translate) {
         const area = (response.data = response.data.map((a) => {
            return {
               IdArea: a.IdArea,
               NombreArea: a.area_name,
               IdTipoUnidadArea: a.IdTipoUnidadArea,
            };
         }));
         this.setState({areas: area});
      } else {
         this.setState({areas: response.data});
      }
   }

   return response;
}
