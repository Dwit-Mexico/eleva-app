import Request from "../../core/api";

const request = new Request();

export async function getProblemas(IdEquipo, translate) {
   if (IdEquipo) {
      this.setState({problemas: []});

      const response = await request.get("/app/unidades/get/problemas/equipo", {
         IdEquipo,
      });

      if (Array.isArray(response.data)) {
         if (translate) {
            const problem = (response.data = response.data.map((p) => {
               return {
                  IdProblema: p.IdProblema,
                  NombreProblema: p.problem_name,
               };
            }));
            this.setState({problemas: problem});
         } else {
            this.setState({problemas: response.data});
         }
      }
   } else {
      this.setState({problemas: []});
   }
}
