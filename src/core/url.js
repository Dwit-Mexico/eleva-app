export let API_URL;

if(process.env.NODE_ENV !== 'production') {
	//API_URL 	= 	"http://192.168.1.74:8082";
	API_URL 	= 	"http://192.168.1.102:8082";
} else {
	API_URL 	= 	"https://eleva-test.herokuapp.com";
}