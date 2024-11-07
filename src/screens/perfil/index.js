import React, {useEffect, useState, useCallback} from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Pressable,
} from "react-native";
import {Consumer} from "../../context";
import {useFocusEffect} from "@react-navigation/native";
import Request from "../../core/api";
import Container from "../../components/container";
import ListaViviendas from "../../components/lista-viviendas";
import styles from "../../styles/screens/PerfilStyle";
import Colores from "../../styles/colores";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

function Perfil({navigation, context}) {
  const {locale, setLocale, i18n} = useLanguageContext();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({Nombre: ""});
  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState(false);

  function _logOut(context) {
    if (context) {
      context.logout();
    }
  }

  async function getUsuarioInfo() {
    if (context) {
      const user = await request.post("/app/users/decode/token", {
        token: context.token,
      });
      setUser(user);

      const response = await request.get("/app/unidades/get/unidades");

      if (response.error) {
        Alert.alert(null, i18n.t("profile.error"));
        setError(true);
      }

      if (response.data) {
        setUnidades(response.data);
        setError(false);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    getUsuarioInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (error) {
        getUsuarioInfo();
      }
    }, [error])
  );

  return (
    <View style={{flex: 1, position: "relative"}}>
      <View style={{height: "25%"}}>
        <ImageBackground
          source={require("../../../assets/background.jpg")}
          style={{width: "100%", height: "100%"}}
        ></ImageBackground>
      </View>
      <View style={{position: "absolute", top: 20, right: 20, zIndex: 1}}>
        <Pressable
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setLocale(locale === "es" ? "en" : "es")}
        >
          {locale === "es" ? <Text>ES</Text> : <Text>EN</Text>}
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          position: "relative",
          alignItems: "center",
        }}
      >
        <View style={styles.userData}>
          <Text
            allowFontScaling={false}
            style={{fontSize: 18, color: "#B29360", fontWeight: "bold"}}
          >
            {user.Nombre.toUpperCase()}
          </Text>
          <View style={{height: 8}} />
          <Text allowFontScaling={false} style={{fontSize: 18, color: "#000"}}>
            {user.Direccion}
          </Text>
        </View>
        <View style={{flex: 1, width: "100%", backgroundColor: "#fff"}}>
          <Container>
            <View style={{height: 50}} />
            <View style={{flex: 1, width: "100%"}}>
              {loading ? (
                <ActivityIndicator size={30} color={Colores.spinnerColor} />
              ) : (
                <ListaViviendas lista={unidades} />
              )}
            </View>
            <View style={styles.logoutButtonView}>
              {user.Propietario && (
                <TouchableOpacity
                  style={styles.userButton}
                  onPress={() => navigation.navigate("Usuarios", {unidades})}
                >
                  <Text style={styles.buttonText} allowFontScaling={false}>
                    {i18n.t("profile.users")}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.logoutButton]}
                onPress={() => _logOut(context)}
              >
                <Text allowFontScaling={false} style={styles.buttonText}>
                  {i18n.t("profile.logout")}
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      </View>
    </View>
  );
}

export default Consumer(Perfil);
