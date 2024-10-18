import React, {useState, useRef} from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
import Request from "../../core/api";
import {useLanguageContext} from "../../context/lang";
import styles from "../../styles/screens/RecoverPassword";

const request = new Request();

export default function VerifyCode({navigation, route}) {
  const {i18n, locale} = useLanguageContext();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const {Email} = route.params;
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const OTP = code.join("");

    if (OTP.length !== 6) {
      Alert.alert(
        null,
        locale === "es"
          ? "Por favor ingrese el código completo."
          : "Please enter the complete code."
      );
      setIsLoading(false);
      return;
    }

    const data = {
      Email,
      OTP,
    };

    try {
      const response = await request.post("/app/users/validate/otp", data);

      if (response.isValid) {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
        navigation.navigate("reset-password", {Email, OTP});
      } else {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
      }
    } catch (error) {
      Alert.alert(null, error.message);
    }

    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.jpg")}
      style={{flex: 1, resizeMode: "contain"}}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require("../../../assets/logo2.png")}
              style={styles.logo}
            />
            <Text style={styles.text}>{i18n.t("verifyCode.enterCode")}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  placeholder="0"
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{
                    borderBottomColor: "#ffffff",
                    borderBottomWidth: 1,
                    borderRadius: 4,
                    textAlign: "center",
                    fontSize: 24,
                    paddingVertical: 0,
                    width: 50,
                    height: 50,
                    color: "#fff",
                  }}
                />
              ))}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Validar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("recover-password", {Email})}
            >
              <Text style={styles.buttonText}>{i18n.t("button.back")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
