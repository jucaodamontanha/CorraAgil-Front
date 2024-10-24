import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "../src/components/Button";
import { router } from "expo-router";

export default function Home() {
  return (
    <>
      <StatusBar backgroundColor="#12263A" style="light" />
      <View style={styles.container}>
        <View style={styles.boxTop}>
          <View style={styles.background}>
            <Image source={require("../src/assets/home.png")} />
          </View>

          <View style={styles.transparentView}>
            <Image source={require("../src/assets/corraAgil.png")} />

            <Text style={styles.textTop}>Pronto para acelerar?</Text>
          </View>
        </View>

        <View style={styles.boxMid}>
          <Text style={styles.textMid}> Faça login e comece</Text>
          <Text style={styles.textRace}>sua corrida!</Text>

          <Button title="COMEÇAR" variant="tertiary" onPress={() => router.push("/login")} />
        </View>

        <View style={styles.boxBottom}>
          <Text style={styles.privacyText}>
            Para proteger sua privacidade e garantir a segurança de suas
            informações pessoais, ao continuar, você concorda com a:
          </Text>

          <Text style={styles.privacyPolicy}>Política de privacidade</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12263A",
    alignItems: "center",
  },
  boxTop: {
    alignItems: "center",
  },
  background: {
    position: "relative",
  },
  transparentView: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    height: 535,
    width: 430,
  },
  textTop: {
    color: "#FFF",
    fontSize: 30,
    marginTop: 12,
  },
  boxMid: {
    alignItems: "center",
    marginTop: 15,
  },
  textMid: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    paddingLeft: 15,
  },
  textRace: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  boxBottom: {
    alignItems: "center",
    marginTop: 25,
  },
  privacyText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  privacyPolicy: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
