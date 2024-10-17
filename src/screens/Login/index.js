import React, {useState, useEffect} from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
  Pressable,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Consumer} from "../../context";
import Boton from "../../components/boton/BotonAccion";
import LoginStyle from "../../styles/screens/LoginStyle";
import TextStyle from "../../styles/text";
import InputStyles from "../../styles/inputs";
import {useLanguageContext} from "../../context/lang";

function LoginScreen(props) {
  const {locale, i18n, setLocale} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    const {email, password} = formData;
    if (!email) {
      Alert.alert(null, i18n.t("login.invalidEmail"));
      setLoading(false);
      return;
    }
    if (!password) {
      Alert.alert(null, i18n.t("login.invalidPassword"));
      setLoading(false);
      return;
    }
    const {context} = props;
    if (context) {
      const validar = await context.validar(email, password);
      if (validar.activar) {
        props.navigation.navigate("ActualizarPassword", {
          username: email,
          IdPersona: validar.IdPersona,
        });
        return;
      }
      await context.login(email, password, locale);
    }
    setLoading(false);
  };

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={LoginStyle.ImageBackground}
    >
      <View style={LoginStyle.backGround}>
        <View style={LoginStyle.languageContainer}>
          <Pressable
            style={LoginStyle.languageButton}
            onPress={() => setLocale(locale === "es" ? "en" : "es")}
          >
            {locale === "es" ? <Text>ES</Text> : <Text>EN</Text>}
          </Pressable>
        </View>
        <View style={LoginStyle.loginView}>
          <Image
            source={require("../../../assets/logo2.png")}
            style={{width: 140, height: 140}}
          />
          <Text style={TextStyle.LoginTitle}>{i18n.t("login.title")}</Text>
          <TextInput
            key={`email-${locale}`}
            placeholder={i18n.t("login.email")}
            placeholderTextColor="#eaeaea"
            style={InputStyles.LoginUsername}
            onSubmitEditing={() => inputPassword.focus()}
            ref={(input) => (this.inputUsername = input)}
            returnKeyType="next"
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
          <View style={InputStyles.LoginPassword}>
            <TextInput
              key={`password-${locale}`}
              placeholder={i18n.t("login.password")}
              placeholderTextColor="#eaeaea"
              style={{color: "#fff", flex: 1}}
              secureTextEntry={!showPassword}
              ref={(input) => (this.inputPassword = input)}
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
              onChangeText={(text) =>
                setFormData({...formData, password: text})
              }
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#fff"
              />
            </Pressable>
          </View>
          <Boton onPress={handleSubmit} loading={loading}>
            <Text style={TextStyle.loginButton}>{i18n.t("button.start")}</Text>
          </Boton>
          <View style={{height: 16}} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("recover-password", {
                usuario: formData.email,
              })
            }
          >
            <Text style={TextStyle.forgotPassword}>
              {i18n.t("login.forgotPassword")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Consumer(LoginScreen);
