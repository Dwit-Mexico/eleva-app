import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {useLanguageContext} from "../../context/lang";
import styles from "../../styles/screens/RecoverPassword";

export default function RecoverPasswordForm({
  onEmailChange,
  onSubmit,
  isLoading,
  navigation,
}) {
  const {i18n} = useLanguageContext();

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
          <Text style={styles.text}>
            Ingrese su correo electrónico registrado para recibir un código de
            verificación.
          </Text>
          <TextInput
            placeholder={i18n.t("recoverPassword.email")}
            placeholderTextColor="#eaeaea"
            style={styles.input}
            returnKeyType="go"
            onChangeText={(text) => onEmailChange(text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Solicitar código</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>{i18n.t("button.back")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
