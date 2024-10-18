import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/Login";
import RecoverPassword from "../screens/Login/recover-password";
import VerifyCode from "../screens/Login/verify-code";
import ActualizarPassword from "../screens/Login/ActualizarPassword";
import ResetPassword from "../screens/Login/reset-password";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="recover-password"
        component={RecoverPassword}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="verify-code"
        component={VerifyCode}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="reset-password"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="ActualizarPassword"
        component={ActualizarPassword}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
