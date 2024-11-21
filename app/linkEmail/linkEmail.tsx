import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function LinkEmail() {
    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#12263A" barStyle="light-content" />

                <View style={styles.image}>
                    <Image source={require("../../src/assets/corraAgil.png")} />
                </View>

                <View style={styles.boxMid}>
                    <Text style={styles.textMid}>
                        Acabamos de enviar um link para o seu e-mail.
                    </Text>
                </View>

                <View style={styles.boxBottom}>
                    <Text style={styles.textBottom}>
                        Dica: Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de spam!
                    </Text>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => router.push("../login/login")}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
            </View>
        </>

    );
}