import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12263A",
        justifyContent: "center",
        alignItems: "center",
    },
    boxTitle:{
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle:{
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 32,
        marginTop: 44
    },
    boxMid:{
        marginTop: 44
    },
    textMid:{
        color: "#FFF",
        textAlign: "center",
        fontSize: 20,
        width: 300,
    },
    boxInput:{
        marginTop: 44,
        width: 346,
    },
    textInput:{
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20, 
    },
    error: {
        color: "red",
        fontSize: 14,
        margin: 5,
        textAlign: "center",
      },
    backButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
      }
});

export default styles;