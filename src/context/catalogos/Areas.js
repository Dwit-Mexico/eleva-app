import Request from "../../core/api";

const request = new Request();

export async function getAreas(IdUnidad) {
   this.setState({areas: []});

   const response = await request.get("/app/unidades/get/areas/unidad", {
      IdUnidad,
   });

   if (Array.isArray(response.data)) {
      this.setState({areas: response.data});
   }

   return response;
}
