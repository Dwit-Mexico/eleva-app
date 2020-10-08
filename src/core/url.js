export let API_URL;

if(process.env.NODE_ENV !== 'production') {
	API_URL 	= 	"http://localhost:8081";
} else {
	API_URL 	= 	"https://eleva.herokuapp.com";
}