import Request from "../../core/api";

const request = new Request();

export async function getProblemas(IdEquipo) {
   if (IdEquipo) {
      this.setState({problemas: []});

      const response = await request.get("/app/unidades/get/problemas/equipo", {
         IdEquipo,
      });

      if (Array.isArray(response.data)) {
         this.setState({problemas: response.data});
      }
   } else {
      this.setState({problemas: []});
   }
}
