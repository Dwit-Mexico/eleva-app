export let API_URL;

if(process.env.NODE_ENV !== 'production') {
	API_URL 	= 	"http://192.168.1.74:8082";
} else {
	API_URL 	= 	"https://elevatest.herokuapp.com";
}