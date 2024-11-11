import React, { useState } from "react";
import { Alert, View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { Input } from "../../src/components/Input";
import { Button } from "../../src/components/Button";
import styles from "./styles";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

//!@#$%^&*(),.?":{}|<>

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*[@#%&$]).*$/, "A senha deve conter pelo menos uma letra maiúscula e um caractere especial (@, #, %, & ou $)"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export default function Register() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const sendForm = async () => {

    try {
      setErrors({});
      setLoading(true);

      await validationSchema.validate(
        { nome, email, password, confirmPassword },
        { abortEarly: false }
      );

      const endPoint = "https://corraagil.onrender.com/cadastro"


      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeCompleto: nome,
          email: email,
          senha: password,

        }),
      });

      const responseText = await response.text()

      let data

      try {
        data = responseText.startsWith("{") || responseText.startsWith("[")
          ? JSON.parse(responseText)
          : responseText;
      } catch (jsonError) {
        throw new Error("Erro ao processar a resposta como JSON: " + jsonError);
      }

      if (!response.ok) {
        if (response.status === 500) {
          alert("Erro no servidor. Tente novamente mais tarde");
          throw new Error("Erro no servidor. Tente novamente mais tarde");
        } else if (response.status === 409) {
          alert("Email ja cadastrado");
          throw new Error("Email ja cadastrado");
        } else if (response.status === 400) {
          alert("A senha deve ter no mínimo 8 caracteres, pelo menos um caractere especial (@, #, %, & ou $) e uma letra maiúscula.");
          throw new Error("Email ja cadastrado");
        } else {
          throw new Error((data.message || response.statusText || data));
        }
      }

      Alert.alert("Sucesso", "Conta registrada com sucesso", [
        { text: "OK", onPress: () => router.push("../login/login") }
      ]);

      setNome("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

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
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#12263A" barStyle="light-content" />
        <View style={styles.top}>
          <Image
            source={require("../../src/assets/corraAgil.png")}
            style={{ marginTop: 23 }}
          />
        </View>

        <Text style={styles.title}>Criar uma conta</Text>

        <View style={styles.containerInput}>
          <Input
            placeholder={"Nome"}
            value={nome}
            onChangeText={setNome} />
          {errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

          <Input
            placeholder={"E-mail"}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            autoComplete="off"
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Input
            placeholder={"Senha"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isPasswordVisible}
            autoCapitalize="none"
            IconRigth={Ionicons}
            iconRigthName={isPasswordVisible ? "eye-off" : "eye"}
            onIconRigthPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Input
            placeholder={"Confirmar senha"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={isPasswordVisible}
            autoCapitalize="none"
            IconRigth={Ionicons}
            iconRigthName={isPasswordVisible ? "eye-off" : "eye"}
            onIconRigthPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button title="CONFIRMAR" variant="primary" onPress={() => sendForm()} loading={loading} />
          {/* <Button title="Entrar com Facebook" variant="secondary" onPress={handleSubmit} />
          <Button title="Entrar com Google" variant="tertiary" onPress={handleSubmit} /> */}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}