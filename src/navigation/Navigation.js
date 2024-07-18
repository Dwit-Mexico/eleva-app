import React, {Component} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {NavigationContainer} from "@react-navigation/native";
import {Consumer} from "../context";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import LoadingLoginScreen from "../components/loading-screen/LoadingLoginScreen";

class Navigation extends Component {
   constructor(props) {
      super(props);
      this.state = {
         auth: false,
         loginUser: "",
         loading: true,
      };
   }

   async componentDidMount() {
      await this.verifyUser();
   }

   async componentDidUpdate(prevProps, prevState) {
      let loginUser = await AsyncStorage.getItem("LoginUser");
      if (loginUser !== prevState.loginUser) {
         await this.verifyUser();
      }
   }

   async verifyUser() {
      let loginUser = await AsyncStorage.getItem("LoginUser");
      let auth = false;
      this.setState({loginUser});
      if (loginUser) {
         loginUser = JSON.parse(loginUser);
         if (loginUser.token) {
            auth = true;
         } else {
            auth = false;
         }
      } else {
         auth = false;
      }
      this.setState({auth, loading: false});
   }

   render() {
      let auth = this.state.auth;
      if (this.state.loading) {
         return <LoadingLoginScreen />;
      }
      return (
         <NavigationContainer>
            {auth ? <AppStack /> : <AuthStack />}
         </NavigationContainer>
      );
   }
}

export default Consumer(Navigation);
