import Request from "../../core/api";

const request = new Request();

export async function getReportes() {
  const response = await request.get("/app/garantias/get/single", {});

  if (Array.isArray(response.data)) {
    this.setState({reportes: response.data});
  }

  return response;
}

export async function reloadReportes(translate) {
  this.setState({loading_reportes: true});

  const response = await request.get("/app/garantias/get/single", {});

  if (Array.isArray(response.data)) {
    if (translate) {
      const reports = (response.data = response.data.map((r) => {
        return {
          ...r,
          NombreArea: r.area_name,
          NombreEquipo: r.equipment_name,
          NombreProblema: r.problem_name,
        };
      }));
      this.setState({reportes: reports});
    } else {
      this.setState({reportes: response.data});
    }
  }

  this.setState({loading_reportes: false});
}
