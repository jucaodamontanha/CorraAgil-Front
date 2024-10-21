import React, { useState } from "react";
import { Alert, View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import * as Yup from "yup";
import { router, useRouter } from "expo-router";

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, "A senha deve conter pelo menos uma letra maiúscula e um caractere especial"),
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sendForm = async () => {

    try {
      setErrors({});

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

      if (!response.ok) {
        throw new Error("Erro ao fazer o cadastro")
      }
      const json = await response.json()

      const dados = {
        nomeCompleto: json.nomeCompleto,
        email: json.email,
        senha: json.password
      }

      setNome(dados.nomeCompleto)
      setEmail(dados.email)
      setPassword(dados.senha)
      setConfirmPassword("")

      Alert.alert("Sucesso", "Conta registrada com sucesso", [
        { text: "OK", onPress: () => router.push("/login") }
      ], { cancelable: false }
      );

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
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#12263A" barStyle="light-content" />
        <View style={styles.top}>
          <Image
            source={require("../src/assets/corraAgil.png")}
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
            secureTextEntry={true}
            autoCapitalize="none"
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Input
            placeholder={"Confirmar senha"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
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
          <Button title="CONFIRMAR" variant="primary" onPress={() => sendForm()} />
          {/* <Button title="Entrar com Facebook" variant="secondary" onPress={handleSubmit} />
          <Button title="Entrar com Google" variant="tertiary" onPress={handleSubmit} /> */}
        </View>
      </View>
    </>
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
    padding: 5,
  },
  title: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
  },
  containerInput: {
    padding: 30,
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    margin: 5,
  },
});
