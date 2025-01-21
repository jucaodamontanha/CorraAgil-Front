import { Image, StatusBar, Text, View } from "react-native"
import styles from "./style"
import { Button } from "../../src/components/Button"


export default function Running() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#12263A" barStyle="light-content" />

            <View style={styles.boxTop}>
                <Image style={styles.logo} source={require("../../src/assets/corraAgil.png")} />

                <View style={styles.cronometro}>
                    <Text style={styles.timer}>00:00:00</Text>
                    <Text style={styles.duration}>Duração</Text>
                </View>

                <View style={styles.status}>
                    <View style={styles.distance}>
                        <Text style={styles.distanceKM}>0,00</Text>
                        <Text style={{ color: "#FFA500" }}>Distancia(KM)</Text>
                    </View>

                    <View style={styles.calories}>
                        <Text style={styles.caloriesQuant}>0</Text>
                        <Text style={{ color: "#FFA500" }}>Calorias</Text>
                    </View>

                    <View style={styles.steps}>
                        <Text style={styles.stepsDistance}>00:00</Text>
                        <Text style={{ color: "#FFA500" }}>Passos (min/km)</Text>
                    </View>

                </View>
            </View>

            <View style={styles.boxBottom}>
                <View style={styles.backgroundMap}>

                </View>

                <View style={styles.transparentView}>
                    <Button title="CORRER" variant="primary" />

                    <View style={styles.buttonMenu}>
                        <Text style={{ color: "#FFA500" }}>Notificação</Text>
                        <Text style={{ color: "#FFA500" }}>Correr</Text>
                        <Text style={{ color: "#FFA500" }}>Timer</Text>
                        <Text style={{ color: "#FFA500" }}>Histórico</Text>
                    </View>
                </View>
            </View>

        </View>
    )
}