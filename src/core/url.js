export let API_URL;

if (process.env.NODE_ENV !== "production") {
  //API_URL = 'http://192.168.1.231:8082';
  //API_URL = "https://eleva-test.herokuapp.com";
  //API_URL = "https://eleva-cap.herokuapp.com";
  // API_URL = "https://apieleva.azurewebsites.net";
  API_URL = "https://eed3-189-174-171-146.ngrok-free.app";
} else {
  //API_URL = "https://eleva-test.herokuapp.com";
  //API_URL = "https://eleva-cap.herokuapp.com";
  // API_URL = "https://apieleva.azurewebsites.net";
  API_URL = "https://eed3-189-174-171-146.ngrok-free.app";
}
