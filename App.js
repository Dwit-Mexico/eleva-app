import React, {Component} from "react";
import Routes from "./src/core/routes";
import {LogBox} from "react-native";

LogBox.ignoreLogs(["It appears that you are "]); // Ignore log notification by message
LogBox.ignoreLogs(["expo-permissions is now deprecated "]);
LogBox.ignoreLogs(["AsyncStorage has been extracted "]);
LogBox.ignoreAllLogs(); //Ignore all log notifications

class App extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return <Routes />;
   }
}

export default App;
