import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Insira um endereço de e-mail válido").required("E-mail é obrigatório"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const sendEmail = async () => {
    try {
      setErrors({});
      setLoading(true);

      await validationSchema.validate(
        { email },
        { abortEarly: false }
      );

      const endPoint = "https://corraagil.onrender.com/resetSenha"

      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
        if (response.status === 500) {
         Alert.alert("Erro","Erro no servidor. Tente novamente mais tarde")
          throw new Error("Erro no servidor. Tente novamente mais tarde");
        } else if (response.status === 400 || response.status === 401 || response.status === 404) {
          Alert.alert("Erro","Email de usuario não cadastrado")
          throw new Error("Email de usuario não cadastrado");
        } else {
          throw new Error((data.message || response.statusText || data));
        }
      }

      if (data.email) {
        setEmail(data.email);
      }

      router.push("../linkEmail/linkEmail")

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
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#12263A" barStyle="light-content" />
        <View style={styles.imageView}>
          <Image source={require("../../src/assets/corraAgil.png")} />
        </View>

        <Text style={styles.forgotText}>Esqueceu a senha?</Text>

        <View style={styles.boxEmail}>

          <Text style={styles.textEmail}> Qual o seu e-mail de cadastro? </Text>

          <Input
            placeholder={"E-mail"}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            autoComplete="off"
            onChangeText={text => setEmail(text)}
          />

          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        </View>

        <Button
          title="ENVIAR"
          variant="tertiary"
          onPress={() => { sendEmail() }}
          loading={loading}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

      </View>

    </>
  );
}