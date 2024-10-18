import React, {useState} from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Request from "../../core/api";
import {useLanguageContext} from "../../context/lang";
import styles from "../../styles/screens/RecoverPassword";

const request = new Request();

export default function ResetPassword({navigation, route}) {
  const {i18n, locale} = useLanguageContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {Email, OTP} = route.params;

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(
        null,
        locale === "es"
          ? "Las contraseñas no coinciden."
          : "Passwords do not match."
      );
      return;
    }

    if (!newPassword) {
      Alert.alert(
        null,
        locale === "es"
          ? "La contraseña es requerida."
          : "Password is required."
      );
      return;
    }

    setIsLoading(true);

    const data = {
      Email,
      OTP,
      Password: newPassword,
    };

    try {
      const response = await request.post(
        "/app/users/recovery/password/reset",
        data
      );

      if (response.error) {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
      } else if (response.updated) {
        Alert.alert(
          null,
          locale === "es" ? response.message.es : response.message.en
        );
        navigation.navigate("Login");
      } else {
        Alert.alert(
          null,
          locale === "es"
            ? "La contraseña no pudo ser actualizada"
            : "Password could not be updated."
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
            <Text style={styles.text}>Restablecer Contraseña</Text>
            <View style={styles.inputPassword}>
              <TextInput
                key={`new-password-${locale}`}
                placeholder="Nueva contraseña"
                placeholderTextColor="#eaeaea"
                style={{color: "#fff", flex: 1}}
                secureTextEntry={!showPassword}
                onChangeText={setNewPassword}
                value={newPassword}
                returnKeyType="next"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
            <View style={styles.inputPassword}>
              <TextInput
                key={`confirm-password-${locale}`}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#eaeaea"
                style={{color: "#fff", flex: 1}}
                secureTextEntry={!showConfirmPassword}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                returnKeyType="done"
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#fff"
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleResetPassword}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Enviar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("verify-code", {Email})}
            >
              <Text style={styles.buttonText}>{i18n.t("button.back")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
