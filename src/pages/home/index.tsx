import React from "react";

import { View, Text, Image, Alert } from "react-native"
import { styles } from "./styles";

import { Button } from "../../components/Button";


export default function Home() {
    const press = () => {
        Alert.alert("Botão pressionado!")
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <View style={styles.background}>
                    <Image source={require("../../assets/Home-CorraAgil.png")} />
                </View>

                <View style={styles.transparentView}>
                    <Image source={require("../../assets/corraAgil.png")} />

                    <Text style={styles.textTop}>Pronto para acelerar?</Text>

                </View>
            </View>

            <View style={styles.boxMid}>
                <Text style={styles.textMid}> Faça login e comece</Text>
                <Text style={styles.textRace}>sua corrida!</Text>

                <Button title="COMEÇAR" onPress={press} variant="secondary"/>
            </View>

            <View style={styles.boxBottom}>
                <Text style={styles.privacyText}>
                    Para proteger sua privacidade e garantir a segurança de suas informações pessoais, ao continuar, você concorda com a:
                </Text>

                <Text style={styles.privacyPolicy}>
                    Política de privacidade
                </Text>
            </View>

        </View>
    );
}