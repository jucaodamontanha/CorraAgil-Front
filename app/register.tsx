import React, { useState } from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

export default function Register() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    try {
      setErrors({});

      await validationSchema.validate(
        { nome, email, password, confirmPassword },
        { abortEarly: false }
      );
      // navigation.navigate("Login");
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
          <Input placeholder={"Nome"} value={nome} onChangeText={setNome} />
          {errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

          <Input placeholder={"E-mail"} value={email} onChangeText={setEmail} />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Input
            placeholder={"Senha"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Input
            placeholder={"Confirmar senha"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
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
          <Button title="CONFIRMAR" variant="primary" onPress={handleSubmit} />
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
