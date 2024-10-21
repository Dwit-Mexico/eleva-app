import React, {useState} from "react";
import {Alert, ImageBackground} from "react-native";
import Request from "../../core/api";
import Form from "../../components/forms/RecoverPasswordForm";
import {useLanguageContext} from "../../context/lang";

const request = new Request();

export default function RecoverPassword({navigation}) {
  const {locale} = useLanguageContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    setLoading(true);

    if (!email) {
      Alert.alert(
        null,
        locale === "es"
          ? "Por favor ingrese un correo válido."
          : "Please enter a valid email."
      );
      setLoading(false);
      return;
    }

    const data = {
      Email: email,
    };

    try {
      const response = await request.post("/app/users/recovery/password", data);

      if (response.error) {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
      } else if (response.sended) {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
        navigation.navigate("verify-code", {Email: email});
      } else {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
      }
    } catch (error) {
      Alert.alert(null, error.message.es);
    }

    setLoading(false);
  }

  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={{flex: 1, resizeMode: "contain"}}
    >
      <Form
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isLoading={loading}
        navigation={navigation}
      />
    </ImageBackground>
  );
}
