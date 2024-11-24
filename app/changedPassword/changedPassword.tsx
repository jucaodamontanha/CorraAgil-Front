import { View, Text, Image, StatusBar } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import styles from "./style";

export default function ChangedPassword() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("../login/login");
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <View style={styles.container}>
                <StatusBar backgroundColor="#12263A" barStyle="light-content" />

                <View style={styles.image}>
                    <Image source={require("../../src/assets/check.png")} />
                </View>

                <View style={styles.boxMid}>
                    <Text style={styles.textMid}>
                        Sua senha foi alterada com sucesso
                    </Text>
                </View>
            </View>
        </>

    );
}