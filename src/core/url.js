export let API_URL;

if (process.env.NODE_ENV !== "production") {
  //API_URL = 'http://192.168.1.231:8082';
  // API_URL = "https://023e-187-251-114-133.ngrok-free.app";
  //API_URL = "https://eleva-test.herokuapp.com";
  //API_URL = "https://eleva-cap.herokuapp.com";
  API_URL = "https://apieleva.azurewebsites.net";
} else {
  // API_URL = "https://023e-187-251-114-133.ngrok-free.app";
  //API_URL = "https://eleva-test.herokuapp.com";
  //API_URL = "https://eleva-cap.herokuapp.com";
  API_URL = "https://apieleva.azurewebsites.net";
}
