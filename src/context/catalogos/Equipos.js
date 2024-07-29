import Request from "../../core/api";

const request = new Request();

export async function getEquipos(IdTipoUnidadArea, translate) {
   this.setState({equipos: []});

   const response = await request.get("/app/unidades/get/equipos/areas", {
      IdTipoUnidadArea,
   });

   if (Array.isArray(response.data)) {
      if (translate) {
         const equipment = (response.data = response.data.map((e) => {
            return {
               IdTipoUnidadEquipo: e.IdTipoUnidadEquipo,
               IdEquipo: e.IdEquipo,
               NombreEquipo: e.equipment_name,
            };
         }));
         this.setState({equipos: equipment});
      } else {
         this.setState({equipos: response.data});
      }
   }

   return response;
}
