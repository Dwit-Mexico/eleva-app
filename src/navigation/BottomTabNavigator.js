import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5} from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

//Stacks
import PerfilStack from "./PerfilStack";
import GarantiasStack from "./GarantiasStack";
import GaleriaStack from "./GaleriaStack";
import DocumentosStack from "./DocumentosStack";
import {useNavigation} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function BottomTabNavigator(props) {
   const navigation = useNavigation();

   function goNotificaciones(screen) {
      navigation.navigate(screen);
   }

   useEffect(() => {
      Notifications.addNotificationResponseReceivedListener(
         ({notification}) => {
            const {request} = notification;
            if (request) {
               const content = request.content || {};
               const data = content.data;
               if (data.screen) {
                  goNotificaciones(data.screen);
               }
            }
         }
      );
   });

   return (
      <Tab.Navigator
         tabBarOptions={{activeTintColor: "#B29360"}}
         screenOptions={{headerShown: false}}
      >
         <Tab.Screen
            name="reportes"
            component={GarantiasStack}
            options={{
               tabBarLabel: () => null,
               tabBarIcon: ({color, size}) => (
                  <FontAwesome5 name="inbox" size={size} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name="documentos"
            component={DocumentosStack}
            options={{
               tabBarLabel: () => null,
               tabBarIcon: ({color, size}) => (
                  <FontAwesome5 name="file-pdf" size={size} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name="perfil"
            component={PerfilStack}
            options={{
               tabBarLabel: () => null,
               tabBarIcon: ({color, size}) => (
                  <FontAwesome5 name="id-card" size={size} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}

export default BottomTabNavigator;
