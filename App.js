import React, {Component} from "react";
import Routes from "./src/core/routes";
import {LogBox} from "react-native";

LogBox.ignoreLogs(["It appears that you are "]);
LogBox.ignoreLogs(["expo-permissions is now deprecated "]);
LogBox.ignoreLogs(["AsyncStorage has been extracted "]);
LogBox.ignoreAllLogs();

class App extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      return <Routes />;
   }
}

export default App;
