import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

export default function LinkEmail() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("../resetPassword/resetPassword");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#12263A" barStyle="light-content" />

                <View style={styles.image}>
                    <Image source={require("../../src/assets/corraAgil.png")} />
                </View>

                <View style={styles.boxMid}>
                    <Text style={styles.textMid}>
                        Acabamos de enviar um token para o seu e-mail.
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