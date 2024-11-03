import { useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import * as Yup from "yup";
import { router } from "expo-router";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const sendForm = async () => {

    try {
      setErrors({});
      setLoading(true);

      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );

      const endPoint = "https://corraagil.onrender.com/cadastro/login";

      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        })
      });

      const responseText = await response.text()

      const contentType = response.headers.get("Content-Type");

      let data;

      try {
        if (responseText.startsWith('{') || responseText.startsWith('[')) {
          data = JSON.parse(responseText)
        } else {
          data = responseText
        }
      } catch (jsonError) {
        throw new Error("Erro ao processar a resposta como JSON: " + jsonError)
      }

      if (!response.ok) {
        throw new Error((data.message || response.statusText || data));
      }

      if (data.email) {
        setEmail(data.email);
      }

      if (data.password) {
        setPassword(data.password);
      }

      alert("Login realizado com sucesso!");

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);

        setTimeout(() => {
          setErrors({});
        }, 5000);
      } else {
        alert("Email ou senha inválidos")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.top}>
        <Image source={require("../src/assets/topLogin.png")} />

        <Image
          source={require("../src/assets/corraAgil.png")}
          style={{ marginTop: 23 }}
        />
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.containerInput}>

        <Input
          placeholder={"E-mail"}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete="off"
          onChangeText={text => setEmail(text)}
          IconRigth={MaterialIcons}
          iconRigthName="email"
        />

        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Input
          placeholder={"Senha"}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={isPasswordVisible}
          autoCapitalize="none"
          IconRigth={Ionicons}
          iconRigthName={isPasswordVisible ? "eye-off" : "eye"}
          onIconRigthPress={() => setIsPasswordVisible(!isPasswordVisible)}
        />

        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      </View>

      <Text style={styles.forgetPassword} onPress={() => router.push("/login")}>ESQUECEU A SENHA?</Text>

      <View style={styles.containerButton}>
        <Button
          title="ENTRAR"
          variant="primary"
          onPress={() => {sendForm() }} 
          loading ={loading} 
          />

        <Button title="CADASTRAR" variant="tertiary" onPress={() => router.push("/register")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12263A",
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
  },
  containerInput: {
    marginTop: 30,
    alignItems: "center",
  },
  toggleButton: {
    padding: 10
  },
  toggleButtonText: {
    fontSize: 16
  },
  forgetPassword: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 33,
  },
  containerButton: {
    marginBottom: 96,
  },
  error: {
    color: "red",
    fontSize: 14,
    margin: 5,
  },
});