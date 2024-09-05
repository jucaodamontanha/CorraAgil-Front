import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const press = () => {
    Alert.alert("Botão pressionado!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../assets/corraAgil.png")}
          style={{ marginTop: 23 }}
        />
      </View>

      <Text style={styles.title}>Criar uma conta</Text>

      <View style={styles.containerInput}>
        <Input placeholder={"Nome"} value={nome} onChangeText={setNome} />
        <Input placeholder={"E-mail"} value={email} onChangeText={setEmail} />
        <Input
          placeholder={"Senha"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Input
          placeholder={"Confirmar senha"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="CONFIRMAR"
          variant="primary"
          onPress={() => console.log("Confirm")}
        />

        <Button
          title="Entrar com Facebook"
          variant="secondary"
          iconName="facebook"
          onPress={() => console.log("Facebook Button Pressed")}
        />
        <Button
          title="Entrar com Google"
          variant="tertiary"
          iconName="google"
          onPress={() => console.log("Google Button Pressed")}
        />
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

  forgetPassword: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 33,
  },
  containerButton: {
    marginBottom: 96,
  },
});
