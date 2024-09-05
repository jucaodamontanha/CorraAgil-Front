import { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, Alert } from "react-native";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const press = () => {
    Alert.alert("Botão pressionado!");
  };

  async function getLogin() {
    try {
      if (!email || !password) {
        return Alert.alert("Atenção", "Email e senha não podem ser em branco");
      }

      Alert.alert("Logado com sucesso!");
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require("../assets/topLogin.png")} />

        <Image
          source={require("../assets/corraAgil.png")}
          style={{ marginTop: 23 }}
        />
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.containerInput}>
        <Input placeholder={"Email"} value={email} onChangeText={setEmail} />
        <Input
          placeholder={"Senha"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <Text style={styles.forgetPassword}>ESQUECEU A SENHA?</Text>

      <View style={styles.containerButton}>
        <Button
          title="ENTRAR"
          variant="primary"
          onPress={() => console.log("Confirm")}
        />
        <Button title="CADASTRAR" onPress={press} variant="tertiary" />
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
