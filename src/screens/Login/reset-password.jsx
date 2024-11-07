import React, {useState} from "react";
import {Alert, ImageBackground} from "react-native";
import Request from "../../core/api";
import {useLanguageContext} from "../../context/lang";
import Form from "../../components/forms/ResetPasswordForm";

const request = new Request();

export default function ResetPassword({navigation, route}) {
  const {locale} = useLanguageContext();
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
      <Form
        showPassword={showPassword}
        onShowPasswordChange={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        onShowConfirmPasswordChange={setShowConfirmPassword}
        onNewPasswordChange={setNewPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onSubmit={handleResetPassword}
        isLoading={isLoading}
        navigation={navigation}
        Email={Email}
        OTP={OTP}
      />
    </ImageBackground>
  );
}
