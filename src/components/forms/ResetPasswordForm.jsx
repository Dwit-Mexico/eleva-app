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
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useLanguageContext} from "../../context/lang";
import styles from "../../styles/screens/RecoverPassword";

export default function ResetPasswordForm({
  showPassword,
  onShowPasswordChange,
  showConfirmPassword,
  onShowConfirmPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  isLoading,
  navigation,
}) {
  const {i18n, locale} = useLanguageContext();

  return (
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
              onChangeText={(text) => onNewPasswordChange(text)}
              returnKeyType="next"
            />
            <Pressable onPress={() => onShowPasswordChange(!showPassword)}>
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
              onChangeText={(text) => onConfirmPasswordChange(text)}
              returnKeyType="done"
            />
            <Pressable
              onPress={() => onShowConfirmPasswordChange(!showConfirmPassword)}
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
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
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
  );
}
