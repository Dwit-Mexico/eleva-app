import Request from "../../core/api";

const request = new Request();

export async function getEquipos(IdTipoUnidadArea) {
   this.setState({equipos: []});

   const response = await request.get("/app/unidades/get/equipos/areas", {
      IdTipoUnidadArea,
   });

   if (Array.isArray(response.data)) {
      this.setState({equipos: response.data});
   }

   return response;
}
