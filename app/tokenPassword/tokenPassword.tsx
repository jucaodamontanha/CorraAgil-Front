import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from "react-native";
import { useEffect, useState } from "react";
import { router, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../../src/components/Input";
import styles from "./styles";
import { Button } from "../../src/components/Button";

export default function TokenPassword() {
    const [token, setToken] = useState("");
    const [isTokenVisible, setIsTokenVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const sendToken = async () => {
        try {
            setLoading(true);

            const endPoint = "https://corraagil.onrender.com/verificaToken"

            const response = await fetch(endPoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            const responseText = await response.text()

            let data;

            try {
                data = responseText.startsWith("{") || responseText.startsWith("[")
                    ? JSON.parse(responseText)
                    : responseText;
            } catch (jsonError) {
                throw new Error("Erro ao processar a resposta como JSON: " + jsonError);
            }

            if (!response.ok) {
                if (response.status === 500) {
                    Alert.alert("Erro", "Erro no servidor. Tente novamente mais tarde");
                    throw new Error("Erro no servidor. Tente novamente mais tarde");
                } else if (response.status === 401) {
                    Alert.alert("Erro", "Token inválido ou expirado");
                    throw new Error("Token inválido");
                } else {
                    throw new Error((data.message || response.statusText || data));
                }
            }

            router.push({
                pathname: "../resetPassword/resetPassword",
                params: { token },
            })

        } finally {
            setLoading(false);
        }
    }

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

                <View style={styles.boxToken}>
                    <Text style={styles.textToken}>
                        Digite o token:
                    </Text>

                    <Input placeholder={"Token"}
                        value={isTokenVisible ? token : token.replace(/./g, '●')}
                        keyboardType="numeric"
                        textContentType="oneTimeCode"
                        onChangeText={setToken}
                        IconRigth={Ionicons}
                        iconRigthName={isTokenVisible ? "eye-off" : "eye"}
                        onIconRigthPress={() => setIsTokenVisible(!isTokenVisible)}
                        editable
                    />

                    <Button title="ENVIAR TOKEN" variant="tertiary" onPress={() => sendToken()} loading={loading} />
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