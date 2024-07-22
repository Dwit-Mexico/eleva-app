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
import {Consumer} from "../../context";
import Container from "../../components/container";
import Boton from "../../components/boton/BotonAccion";
import LoginStyle from "../../styles/screens/LoginStyle";
import TextStyle from "../../styles/text";
import InputStyles from "../../styles/inputs";
import {useLanguageContext} from "../../context/lang";

function LoginScreen(props) {
   const {locale, i18n, setLocale} = useLanguageContext();
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   console.log(locale);

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
            this.props.navigation.navigate("ActualizarPassword", {
               username: email,
               IdPersona: validar.IdPersona,
            });
            return;
         }
         await context.login(email, password);
      }
      setLoading(false);
   };

   useEffect(() => {
      StatusBar.setBarStyle("light-content");
   }, []);

   return (
      <ImageBackground
         source={require("../../../assets/background.jpg")}
         style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            position: "relative",
         }}
      >
         <View style={LoginStyle.backGround}>
            <Container>
               <View style={LoginStyle.languageButtonContainer}>
                  <Pressable
                     style={{backgroundColor: "white", padding: 10}}
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
                  <View style={{height: 16}} />
                  <Text style={TextStyle.LoginTitle}>
                     {i18n.t("login.title")}
                  </Text>
                  <View style={{height: 16}} />
                  <TextInput
                     placeholder={i18n.t("login.email")}
                     placeholderTextColor="#eaeaea"
                     style={InputStyles.LoginUsername}
                     onSubmitEditing={() => inputPassword.focus()}
                     ref={(input) => (this.inputUsername = input)}
                     returnKeyType="next"
                     onChangeText={(text) =>
                        setFormData({...formData, email: text})
                     }
                  />
                  <View style={{height: 8}} />
                  <TextInput
                     placeholder={i18n.t("login.password")}
                     placeholderTextColor="#eaeaea"
                     style={InputStyles.LoginPassword}
                     secureTextEntry={true}
                     ref={(input) => (this.inputPassword = input)}
                     returnKeyType="go"
                     onSubmitEditing={handleSubmit}
                     onChangeText={(text) =>
                        setFormData({...formData, password: text})
                     }
                  />
                  <View style={{height: 32}} />
                  <View style={{width: 300}}>
                     <Boton onPress={handleSubmit} loading={loading}>
                        <Text style={TextStyle.loginButton}>
                           {i18n.t("login.button")}
                        </Text>
                     </Boton>
                  </View>
                  <View style={{height: 16}} />
                  <View style={{width: 300}}>
                     <TouchableOpacity
                        onPress={() =>
                           props.navigation.navigate("RecuperarPassword", {
                              usuario: formData.email,
                           })
                        }
                     >
                        <Text
                           style={{
                              fontSize: 12,
                              color: "white",
                              textAlign: "center",
                           }}
                        >
                           {i18n.t("login.forgotPassword")}
                        </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Container>
         </View>
      </ImageBackground>
   );
}

export default Consumer(LoginScreen);
